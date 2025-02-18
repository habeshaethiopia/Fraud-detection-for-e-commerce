# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Make ports 5001 (Flask) and 8050 (Dash) available to the world outside this container
EXPOSE 5001 8050

# Run the Flask application

CMD ["mlflow", "ui", "&&",  "python", "src/server.py","&&",  "python", "src/app.py" ]