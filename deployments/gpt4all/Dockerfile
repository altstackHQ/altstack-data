# Dockerfile for GPT4All (Server Implementation)
# Stage 1: Build
FROM python:3.11-slim-bookworm AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Install GPT4All Python bindings (which provides the API server)
RUN pip install --no-cache-dir gpt4all

# Stage 2: Runtime
FROM python:3.11-slim-bookworm

# Create non-root user
RUN groupadd -r gpt4all && useradd -r -g gpt4all gpt4all

WORKDIR /app

# Copy python packages from builder
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Environment variables for model path
ENV MODEL_PATH=/app/models
RUN mkdir -p ${MODEL_PATH} && chown -R gpt4all:gpt4all /app

# GPT4All uses models; we should use a host volume for these or download them.
# The volume will be defined in docker-compose.

USER gpt4all

EXPOSE 4891

# Default command to run the API server (Adjust based on specific GPT4All server implementation)
# Note: GPT4All often provides a CLI or a local app. This represents a server wrapper.
CMD ["python", "-m", "gpt4all.api"] 
