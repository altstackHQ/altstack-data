# Production Dockerfile for AppFlowy
# Based on Rust and Flutter/Web requirements.
# Stage 1: Build
FROM rust:1.75-slim-bookworm AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    git \
    cmake \
    clang \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

# Build the application (Simplified for demonstration)
# In a real scenario, you'd build the frontend and backend separately.
# RUN cargo build --release

# Stage 2: Runtime
FROM debian:bookworm-slim

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

# Copy build artifacts from builder stage (Adjust paths as needed)
# COPY --from=builder /app/target/release/appflowy-cloud .

# Set permissions
RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 8080

CMD ["./appflowy-cloud"]
