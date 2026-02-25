# Dockerfile for Apache Superset
# Stage 1: Build Frontend (Optional if using pre-built assets, but good for custom builds)
FROM node:20-alpine AS frontend-builder
WORKDIR /app/superset-frontend
COPY superset-frontend/package.json superset-frontend/package-lock.json ./
RUN npm ci
COPY superset-frontend/ .
RUN npm run build

# Stage 2: Final Image
FROM python:3.11-slim-bookworm

# Create non-root user
RUN groupadd -r superset && useradd -r -m -g superset superset

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libpq-dev \
    libssl-dev \
    libffi-dev \
    libsasl2-dev \
    libldap2-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Superset
RUN pip install --no-cache-dir apache-superset flask-appbuilder

# Copy built frontend assets (if built in Stage 1)
# COPY --from=frontend-builder /app/superset/static/assets /app/superset/static/assets

# Set permissions
RUN chown -R superset:superset /app

USER superset

ENV SUPERSET_CONFIG_PATH=/app/superset_config.py
ENV FLASK_APP=superset

EXPOSE 8088

CMD ["superset", "run", "-p", "8088", "--with-threads", "--reload", "--debugger"]
