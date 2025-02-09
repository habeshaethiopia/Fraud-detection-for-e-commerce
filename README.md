# Fraud Detection and Geolocation Analysis

## Project Overview
This project focuses on detecting fraudulent transactions using data analysis, geolocation enrichment, and machine learning techniques. The primary objective is to preprocess financial transaction data, engineer meaningful features, and build a robust fraud detection model.

## Features
- **Data Cleaning**: Handling missing values, removing duplicates, and correcting data types.
- **Exploratory Data Analysis (EDA)**: Univariate and bivariate analysis to understand transaction patterns.
- **Geolocation Analysis**: Mapping IP addresses to country locations for fraud detection.
- **Feature Engineering**: Extracting time-based and transaction velocity features.
- **Normalization & Scaling**: Ensuring numerical stability for machine learning models.
- **Encoding Categorical Variables**: Preparing data for predictive modeling.
- **Machine Learning Models** (Upcoming): Implementing supervised and unsupervised learning techniques for fraud detection.

## Dataset
- **Fraud_Data.csv**: Contains transaction details, timestamps, and fraud labels.
- **IpAddress_to_Country.csv**: Maps IP addresses to geographic locations.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/fraud-detection.git
   cd fraud-detection
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the preprocessing script:
   ```sh
   python preprocess.py
   ```
4. Train the fraud detection model (upcoming):
   ```sh
   python train_model.py
   ```

## Usage
- Modify `config.py` to adjust preprocessing settings.
- Run data analysis scripts to generate insights.
- Use the trained model to predict fraudulent transactions.

## Project Structure
```
fraud-detection/
│── data/
│   ├── Fraud_Data.csv
│   ├── IpAddress_to_Country.csv
│── src/
│   ├── preprocess.py
│   ├── eda.py
│   ├── feature_engineering.py
│   ├── train_model.py
│── models/
│   ├── trained_model.pkl
│── notebooks/
│   ├── exploratory_analysis.ipynb
│── config.py
│── requirements.txt
│── README.md
```

## Contributors
- Adane Moges ([adanemoges6@gmail.com](mailto:adanemoges6@gmail.com))

## License
This project is licensed under the MIT License.
