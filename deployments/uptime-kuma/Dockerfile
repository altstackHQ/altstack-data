# Dockerfile for Uptime Kuma
# Stage 1: Build
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Stage 2: Runtime
FROM node:20-alpine

# Create non-root user
RUN addgroup -S uptimekuma && adduser -S uptimekuma -G uptimekuma

WORKDIR /app

# Copy built assets and node_modules from builder
COPY --from=builder /app ./

# Set permissions
RUN chown -R uptimekuma:uptimekuma /app

USER uptimekuma

EXPOSE 3001

# Start Uptime Kuma
CMD ["node", "server/server.js"]
