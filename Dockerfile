# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Create a virtual environment
RUN python -m venv /app/venv

# Activate the virtual environment and install any needed packages specified in requirements.txt
RUN /app/venv/bin/pip install --upgrade pip && \
    /app/venv/bin/pip install -r requirements.txt

# Make ports 5001 (Flask) and 8050 (Dash) available to the world outside this container
EXPOSE 5001 8050

# Set the entrypoint to use the virtual environment
ENTRYPOINT ["/app/venv/bin/python"]

# Run the Flask application
CMD ["mlflow", "ui", "&&", "src/server.py", "&&", "src/app.py"]