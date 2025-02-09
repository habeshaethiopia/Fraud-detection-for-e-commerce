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