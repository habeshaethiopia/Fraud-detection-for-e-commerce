# dashboard.py

import dash
from dash import dcc, html
import dash_bootstrap_components as dbc
import plotly.express as px
import requests

# Initialize the Dash app
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Load summary statistics from the Flask API
response = requests.get('http://127.0.0.1:5001/api/summary_statistics')
summary_stats = response.json()

# Load fraud trends over time from the Flask API
response = requests.get('http://127.0.0.1:5001/api/fraud_trends')
fraud_trends = response.json()

# Load geolocation analysis from the Flask API
response = requests.get('http://127.0.0.1:5001/api/geolocation_analysis')
geolocation = response.json()

# Load fraud cases by device and browser from the Flask API
response = requests.get('http://127.0.0.1:5001/api/fraud_by_device_browser')
fraud_by_device_browser = response.json()

# Summary Box Layout
summary_box = dbc.Card([
    dbc.CardHeader(html.H5("Summary Statistics")),
    dbc.CardBody([
        html.P(f"Total Transactions: {summary_stats['total_transactions']}", className="card-text"),
        html.P(f"Fraud Cases: {summary_stats['fraud_cases']}", className="card-text"),
        html.P(f"Fraud Percentage: {summary_stats['fraud_percentage']:.2f}%", className="card-text")
    ])
])

# Line Chart for Fraud Trends Over Time
fig_fraud_trends = px.line(
    fraud_trends,
    x='date',
    y='fraud_cases',
    title='Number of Detected Fraud Cases Over Time',
    labels={'date': 'Date', 'fraud_cases': 'Number of Fraud Cases'}
)

# Bar Chart for Geographical Analysis
fig_geolocation = px.bar(
    geolocation,
    x='country',
    y='fraud_cases',
    title='Fraud Cases by Country',
    labels={'country': 'Country', 'fraud_cases': 'Number of Fraud Cases'}
)

# Bar Chart for Fraud Cases by Device and Browser
fig_fraud_by_device_browser = px.bar(
    fraud_by_device_browser,
    x='device_id',
    y='class',
    color='browser',
    title='Fraud Cases by Device and Browser',
    labels={'device_id': 'Device ID', 'class': 'Number of Fraud Cases', 'browser': 'Browser'}
)

# Layout of the Dash app
app.layout = dbc.Container([
    dbc.Row([
        dbc.Col(summary_box, width=4),
        dbc.Col(dcc.Graph(figure=fig_fraud_trends), width=8)
    ]),
    dbc.Row([
        dbc.Col(dcc.Graph(figure=fig_geolocation), width=6),
        dbc.Col(dcc.Graph(figure=fig_fraud_by_device_browser), width=6)
    ])
])

if __name__ == '__main__':
    app.run_server(debug=True)