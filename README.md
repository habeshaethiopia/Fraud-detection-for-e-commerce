
# **Fraud Detection for E-commerce and Bank Transactions**

## **Overview**
This project aims to improve the detection of fraud cases for e-commerce and bank transactions at Adey Innovations Inc., a leading company in the financial technology sector. By leveraging advanced machine learning models, geolocation analysis, and transaction pattern recognition, we aim to create accurate and robust fraud detection systems. This project focuses on handling the unique challenges of both e-commerce and bank transaction data, ensuring timely and reliable fraud detection.

---

## **Business Need**
Fraud detection is crucial for maintaining transaction security, preventing financial losses, and building trust with customers and financial institutions. By using advanced machine learning models and detailed data analysis, Adey Innovations Inc. can spot fraudulent activities more accurately. This helps prevent financial losses and builds trust with customers and financial institutions. A well-designed fraud detection system also makes real-time monitoring and reporting more efficient, allowing businesses to act quickly and reduce risks.

---

## **Project Structure**

### **1. Data Analysis and Preprocessing**
- **Handle Missing Values**: Imputed or dropped missing values.
- **Data Cleaning**: Removed duplicates and corrected data types.
- **Exploratory Data Analysis (EDA)**: Conducted univariate and bivariate analysis.
- **Merge Datasets for Geolocation Analysis**: Converted IP addresses to integer format and merged `Fraud_Data.csv` with `IpAddress_to_Country.csv`.
- **Feature Engineering**: Created features like transaction frequency, velocity, and time-based features (e.g., `hour_of_day`, `day_of_week`).
- **Normalization and Scaling**: Standardized numerical features and encoded categorical features.

### **2. Model Building and Training**
- **Data Preparation**: Separated features and targets for both `Fraud_Data.csv` and `creditcard.csv`.
- **Train-Test Split**: Split the data into training and testing sets (80-20 split).
- **Model Selection**: Compared the performance of the following models:
  - Logistic Regression
  - Decision Tree
  - Random Forest
  - Gradient Boosting
  - Multi-Layer Perceptron (MLP)
  - Convolutional Neural Network (CNN)
  - Recurrent Neural Network (RNN)
  - Long Short-Term Memory (LSTM)
- **Model Training and Evaluation**: Evaluated models using accuracy, precision, recall, and F1-score.
- **MLOps Steps**: Used MLflow to track experiments, log parameters, metrics, and version models.

### **3. Model Explainability**
- **SHAP for Explainability**:
  - **Summary Plot**: Provides an overview of the most important features.
  - **Force Plot**: Visualizes the contribution of features for a single prediction.
  - **Dependence Plot**: Shows the relationship between a feature and the model output.
- **LIME for Explainability**:
  - **Feature Importance Plot**: Shows the most influential features for a specific prediction.

### **4. Model Deployment and API Development**
- **Setting Up the Flask API**:
  - Created a Python script (`serve_model.py`) to serve the model using Flask.
  - Defined API endpoints:
    - `/predict`: Predicts whether a transaction is fraudulent.
    - `/explain`: Provides SHAP explanations for a single prediction.
- **Dockerizing the Flask Application**:
  - Created a `Dockerfile` to containerize the Flask application.
  - Built and ran the Docker container.
- **Logging**:
  - Integrated Flask-Logging to track incoming requests, errors, and fraud predictions for continuous monitoring.

### **5. Build a Dashboard with Flask and Dash**
- **Flask Backend**:
  - Added API endpoints to serve summary statistics, fraud trends over time, geolocation analysis, and fraud cases by device and browser.
- **Dash Frontend**:
  - Displayed total transactions, fraud cases, and fraud percentages in simple summary boxes.
  - Created a line chart showing the number of detected fraud cases over time.
  - Created a bar chart comparing the number of fraud cases across different countries.
  - Created a bar chart comparing the number of fraud cases across different devices and browsers.
- **Dockerizing the Dashboard**:
  - Created a `Dockerfile` to containerize the Dash application.
  - Built and ran the Docker container.

---

## **Deliverables**
- **GitHub Repository**: [Link to GitHub Repository](https://github.com/yourusername/fraud-detection)
- **Blog Post/PDF Report**: [Link to Blog Post/PDF Report](https://medium.com/@yourusername/improved-fraud-detection-for-ecommerce-and-bank-transactions)
- **Screenshots**: Included screenshots demonstrating the functionality of the deployed API and dashboard.

---

## **Key Features**
- **Real-Time Fraud Detection**: The deployed models can predict fraud in real-time, helping businesses act quickly to mitigate risks.
- **Model Explainability**: SHAP and LIME are used to provide insights into model predictions, enhancing transparency and trust.
- **Scalable and Portable Solutions**: The models are containerized using Docker, ensuring scalability and ease of deployment.
- **Interactive Dashboard**: An interactive dashboard using Dash provides valuable insights into fraud patterns, enabling businesses to make informed decisions.

---

## **Getting Started**

### **Prerequisites**
- Python 3.8+
- Docker

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/habeshaethiopia/Fraud-detection-for-e-commerce.git
   cd fraud-detection
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### **Running the Flask API**
1. Build and run the Docker container:
   ```bash
   docker build -t fraud-detection-model .
   docker run -p 5000:5000 fraud-detection-model
   ```

2. Test the API endpoints:
   - **Predict Fraud**:
     ```bash
     curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d '{"feature1": value1, "feature2": value2, ...}'
     ```
   - **Explain Prediction**:
     ```bash
     curl -X POST http://127.0.0.1:5000/explain -H "Content-Type: application/json" -d '{"feature1": value1, "feature2": value2, ...}'
     ```

### **Running the Dashboard**
1. Build and run the Docker container:
   ```bash
   docker build -t fraud-detection-dashboard .
   docker run -p 5001:5001 -p 8050:8050 fraud-detection-dashboard
   ```

2. Open the Dash dashboard in your browser:
   ```
   http://127.0.0.1:8050
   ```

---


## **Acknowledgments**
Special thanks to the tutors at 10 Academy: Mahlet, Elias, Rediet, Kerod, Emitinan, and Rehmet for their guidance and support throughout the project.
