# Dockerfile for Odoo
# Stage 1: Build (Optional for custom modules/assets)
FROM python:3.11-slim-bookworm AS builder

# Stage 2: Final Image
FROM python:3.11-slim-bookworm

# Create non-root user
RUN groupadd -r odoo && useradd -r -m -g odoo odoo

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    libpq-dev \
    libxml2-dev \
    libxslt1-dev \
    libsasl2-dev \
    libldap2-dev \
    libssl-dev \
    libffi-dev \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Odoo dependencies
RUN pip install --no-cache-dir odoo

# Set permissions
RUN chown -R odoo:odoo /app

USER odoo

EXPOSE 8069

CMD ["odoo"]
