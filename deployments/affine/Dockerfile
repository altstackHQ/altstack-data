# Dockerfile for AFFiNE
# Stage 1: Build
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies (using yarn as AFFiNE typically uses it)
RUN yarn install --frozen-lockfile

# Copy source
COPY . .

# Build the app
RUN yarn build

# Stage 2: Runtime
FROM node:20-alpine

# Create non-root user
RUN addgroup -S affine && adduser -S affine -G affine

WORKDIR /app

# Install runtime dependencies (e.g., for image processing if needed)
RUN apk add --no-cache libstdc++

# Copy built assets
COPY --from=builder /app ./

# Set permissions
RUN chown -R affine:affine /app

USER affine

EXPOSE 3000

CMD ["node", "dist/index.js"] 
