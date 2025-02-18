from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import mlflow.sklearn
import shap
import pickle
import logging
import os
import requests

# Initialize Flask app
app = Flask(__name__)

# Configure logging
os.makedirs("./logs", exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("./logs/server.log"), logging.StreamHandler()],
)
logger = logging.getLogger(__name__)

# Load the trained model and scaler from MLflow
mlflow.set_tracking_uri("http://localhost:5000")  # Ensure correct MLflow tracking URI
model_uri = "runs:/ec78f06b112c4f8b92d96f35e4333aee/model"  # Update with actual run ID
try:
    model = mlflow.sklearn.load_model(model_uri)
    scaler = pickle.load(open("model/scaler.pkl", "rb"))
    feature_names = model.feature_names_in_.tolist()
except Exception as e:
    logger.error("Error loading model or scaler: %s", str(e))
    raise e


@app.before_request
def log_request_info():
    logger.info("Headers: %s", request.headers)
    logger.info("Body: %s", request.get_data().decode("utf-8"))


@app.errorhandler(Exception)
def handle_exception(e):
    logger.error("Exception occurred: %s", str(e))
    return jsonify({"error": str(e)}), 500


@app.route("/")
def home():
    return "Welcome to the Fraud Detection API!"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        df = pd.DataFrame([data]) if isinstance(data, dict) else pd.DataFrame(data)

        # Ensure input matches expected schema
        if list(df.columns) != feature_names:
            return jsonify({"error": "Input features do not match model schema"}), 400

        scaled_data = scaler.transform(df)
        prediction = model.predict(scaled_data)
        probability = model.predict_proba(scaled_data)[:, 1]
        return jsonify(
            {"prediction": int(prediction[0]), "probability": float(probability[0])}
        )
    except Exception as e:
        logger.error("Prediction error: %s", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/explain", methods=["POST"])
def explain():
    try:
        data = request.get_json(force=True)
        df = pd.DataFrame([data]) if isinstance(data, dict) else pd.DataFrame(data)

        if list(df.columns) != feature_names:
            return jsonify({"error": "Input features do not match model schema"}), 400

        scaled_data = scaler.transform(df)
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(scaled_data)
        return jsonify({"shap_values": shap_values.tolist()})
    except Exception as e:
        logger.error("SHAP explanation error: %s", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/api/summary_statistics", methods=["GET"])
def summary_statistics():
    try:
        # Load Fraud_Data.csv
        fraud_data = pd.read_csv("Data/fraud_data_cleaned_before_encode.csv")

        # Calculate summary statistics
        total_transactions = len(fraud_data)
        fraud_cases = fraud_data["class"].sum()
        fraud_percentage = (fraud_cases / total_transactions) * 100

        summary_stats = {
            "total_transactions": total_transactions,
            "fraud_cases": int(fraud_cases),
            "fraud_percentage": float(fraud_percentage),
        }

        return jsonify(summary_stats)
    except Exception as e:
        logger.error("Error retrieving summary statistics: %s", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/api/fraud_trends", methods=["GET"])
def fraud_trends():
    try:
        # Load Fraud_Data.csv
        fraud_data = pd.read_csv("Data/fraud_data_cleaned_before_encode.csv")

        # Convert timestamps to datetime purchase_hour,purchase_date

        fraud_data["purchase_time"] = pd.to_datetime(
            fraud_data["purchase_date"]
        )

        # Group by date and count fraud cases
        fraud_trends = (
            fraud_data[fraud_data["class"] == 1]
            .groupby(fraud_data["purchase_time"].dt.date)["class"]
            .count()
            .reset_index()
        )
        fraud_trends.columns = ["date", "fraud_cases"]

        return fraud_trends.to_json(orient="records")
    except Exception as e:
        logger.error("Error retrieving fraud trends: %s", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/api/geolocation_analysis", methods=["GET"])
def geolocation_analysis():
    try:
        # Load Fraud_Data.csv
        fraud_data = pd.read_csv("Data/fraud_data_cleaned_before_encode.csv")

        # Group by country and count fraud cases
        geolocation = fraud_data.groupby("country")["class"].sum().reset_index()
        geolocation.columns = ["country", "fraud_cases"]

        return geolocation.to_json(orient="records")
    except Exception as e:
        logger.error("Error retrieving geolocation analysis: %s", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/api/fraud_by_device_browser", methods=["GET"])
def fraud_by_device_browser():
    try:
        # Load Fraud_Data.csv
        fraud_data = pd.read_csv("Data/fraud_data_cleaned_before_encode.csv")

        # Group by device and browser and count fraud cases
        fraud_by_device_browser = (
            fraud_data.groupby(["browser"])["class"].sum().reset_index()
        )

        return fraud_by_device_browser.to_json(orient="records", indent=4)
    except Exception as e:
        logger.error("Error retrieving fraud by device and browser: %s", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
