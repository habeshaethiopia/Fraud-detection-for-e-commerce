import pandas as pd
import logging
import re
import os
import emoji

# Ensure logs folder exists
os.makedirs("../logs", exist_ok=True)

# Configure logging to write to file & display in Jupyter Notebook
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("../logs/data_cleaning.log"),  # Log to file
        logging.StreamHandler()  # Log to Jupyter Notebook output
    ]
)

def load_csv(file_path):
    """ Load CSV file into a Pandas DataFrame. """
    try:
        df = pd.read_csv(file_path)
        logging.info(f"✅  CSV file '{file_path}' loaded successfully.")
        return df
    except Exception as e:
        logging.error(f"❌ Error loading CSV file: {e}")
        raise
def clean_dataframe(df):
    """
    Cleans a DataFrame by handling missing values, removing duplicates, and correcting data types.
    Logs each step for traceability.

    Args:
        df (pd.DataFrame): Input DataFrame to clean.

    Returns:
        pd.DataFrame: Cleaned DataFrame.
    """
    try:
        logging.info("Starting data cleaning...")
        logging.info(f"Initial shape: {df.shape}")
        logging.info(f"Initial columns: {df.columns.tolist()}")

        # Handle missing values
        logging.info("Processing missing values...")
        missing_values = df.isnull().sum()
        logging.info(f"Missing values per column:\n{missing_values}")

        # Impute numerical columns with mean
        numerical_cols = df.select_dtypes(include=['float64', 'int64']).columns
        for col in numerical_cols:
            if df[col].isnull().any():
                df[col].fillna(df[col].mean(), inplace=True)
                logging.info(f"Imputed missing values in numerical column '{col}' with mean.")

        # Drop rows with missing categorical values
        categorical_cols = df.select_dtypes(include=['object', 'category']).columns
        for col in categorical_cols:
            if df[col].isnull().any():
                df.dropna(subset=[col], inplace=True)
                logging.info(f"Dropped rows with missing values in categorical column '{col}'.")

        # Remove duplicates
        logging.info("Removing duplicates...")
        initial_rows = df.shape[0]
        df.drop_duplicates(inplace=True)
        logging.info(f"Removed {initial_rows - df.shape[0]} duplicate rows.")

        # Convert datetime columns
        logging.info("Correcting data types...")
        datetime_cols = ['signup_time', 'purchase_time']
        for col in datetime_cols:
            if col in df.columns:
                df[col] = pd.to_datetime(df[col])
                logging.info(f"Converted '{col}' to datetime.")

        logging.info(f"Final shape after cleaning: {df.shape}")
        logging.info("Data cleaning completed successfully.\n")
        return df

    except Exception as e:
        logging.error(f"Error during cleaning: {str(e)}", exc_info=True)
        raise
import matplotlib.pyplot as plt
import seaborn as sns

def univariate_analysis(data, column, bins=30):
    """Perform univariate analysis for a numerical column."""
    logging.info(f"Generating univariate analysis for column '{column}'...")
    plt.figure(figsize=(8, 6))
    sns.histplot(data[column], bins=bins, kde=True)
    plt.title(f'Distribution of {column}')
    plt.xlabel(column)
    plt.ylabel('Frequency')
    plt.show()
def analyze_categorical_features(data, column):
    """Analyze a categorical feature by plotting its value counts."""
    logging.info(f"Analyzing categorical feature '{column}'...")
    plt.figure(figsize=(8, 6))
    sns.countplot(data=data, x=column)
    plt.title(f'Value Counts of {column}')
    plt.xlabel(column)
    plt.ylabel('Count')
    plt.xticks(rotation=45)
    plt.show()
def correlation_matrix(data):
    """Compute and visualize the correlation matrix."""
    logging.info("Generating correlation matrix...")
    data = data.select_dtypes(include=['float64', 'int64'])
    corr = data.corr()
    plt.figure(figsize=(10, 8))
    sns.heatmap(corr, annot=True, cmap='coolwarm', fmt='.2f')
    plt.title('Correlation Matrix')
    plt.show()
def bivariate_analysis(data, x_column, y_column):
    """Perform bivariate analysis between two numerical columns."""
    logging.info(f"Generating bivariate analysis for '{x_column}' vs '{y_column}'...") 

    plt.figure(figsize=(8, 6))
    sns.scatterplot(data=data, x=x_column, y=y_column)
    plt.title(f'{x_column} vs {y_column}')
    plt.xlabel(x_column)
    plt.ylabel(y_column)
    plt.show()
def analyze_and_remove_duplicates(data):
    """Analyze and remove duplicate rows."""
    duplicates = data.duplicated().sum()
    if duplicates == 0:
        logging.info("No duplicate rows found.")
    else:
        logging.info(f"Found {duplicates} duplicate rows. Removing them...")
        data.drop_duplicates(inplace=True)
    return data
def ip_to_int(ip):
    """Convert an IP address string to an integer."""
    return int(parts)