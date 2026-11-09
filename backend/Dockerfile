
# 1. Use Python 3.11 as the base image
FROM python:3.11-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy Python dependencies
COPY requirements.txt .

# 4. Install project dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the backend application
COPY . .

# 6. Expose the FastAPI port
EXPOSE 8000

# 7. Start the FastAPI server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
