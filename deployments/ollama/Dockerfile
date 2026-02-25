# Dockerfile for Ollama
# Stage 1: Build (Ollama is written in Go and requires C++ libs for some runners)
FROM golang:1.22-alpine AS builder

# Install build dependencies
RUN apk add --no-cache \
    git \
    cmake \
    gcc \
    g++ \
    make \
    linux-headers

WORKDIR /build

# In a real scenario, you'd clone and build:
# RUN git clone https://github.com/ollama/ollama.git . && make

# Stage 2: Runtime
FROM alpine:3.19

# Create non-root user
RUN addgroup -S ollama && adduser -S ollama -G ollama

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache ca-certificates libstdc++

# Copy binary (Assuming build success)
# COPY --from=builder /build/ollama /usr/local/bin/ollama

# Set permissions
RUN chown -R ollama:ollama /app

USER ollama

ENV OLLAMA_HOST=0.0.0.0
EXPOSE 11434

# Start Ollama
CMD ["ollama", "serve"]
