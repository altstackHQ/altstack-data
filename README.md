<p align="center">
  <img src="assets/logo.png" alt="The Alt Stack" width="120" />
</p>

<h1 align="center">Awesome Open Source Alternatives - The AltStack Data HQ</h1>

<p align="center">
  <strong>A curated list of the best open-source alternatives to popular SaaS products.</strong><br />
  Stop paying for what you can host yourself. Build sovereign infrastructure with AltStack.
</p>

<p align="center">
  <a href="https://github.com/altstackHQ/altstack-data/stargazers"><img src="https://img.shields.io/github/stars/altstackHQ/altstack-data?color=ffdd00&label=Stars&logo=github&style=for-the-badge" alt="GitHub stars" /></a>
  <a href="https://github.com/altstackHQ/altstack-data/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge&logo=apache" alt="License" /></a>
  <a href="https://github.com/altstackHQ/altstack-data/issues"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge&logo=git&logoColor=white" alt="PRs Welcome" /></a>
</p>

<p align="center">
  <a href="https://thealtstack.com"><strong>Explore the Directory</strong></a> •
  <a href="https://thealtstack.com/self-hosted"><strong>Self-Hosted Configurator</strong></a> •
  <a href="https://docs.thealtstack.com"><strong>Self-Hosting Guides</strong></a> •
  <a href="https://github.com/altstackHQ/altstack-data/issues"><strong>Request a Tool</strong></a>
</p>

---

## 🚀 Why Sovereign Infrastructure?

Every SaaS you pay for is a piece of your sovereign control you are leasing. The mission of **AltStack** is to provide the data and deployment configurations necessary to replace the "Big Tech" stack with a **Sovereign Stack** you own.

This repository serves as the **Data HQ** for [The AltStack](https://thealtstack.com). Every tool listed here is vetted for quality, activity, and self-hostability.

## 🚀 Quick Start (Mini-Stacks)

Get up and running in under 2 minutes. These are "Development Mode" snippets. For production-hardened setups (SSL, Backups, Auth), follow the links to The AltStack Documentation.

### 📦 PocketBase (BaaS)
The fastest way to get a backend with Auth, Database, and Admin UI.
```yaml
# docker-compose.yml
services:
  pocketbase:
    image: mujo-code/pocketbase:latest
    container_name: pocketbase
    ports:
      - "8090:8080"
    volumes:
      - ./pb_data:/pb_data
    restart: unless-stopped
```
👉 [Open in Self-Hosted Configurator](https://thealtstack.com/self-hosted/pocketbase) • [Deployment Guide](https://docs.thealtstack.com/deployments/pocketbase)

### 📊 Plausible Analytics (Privacy-First)
Lightweight, open-source analytics.
```yaml
# docker-compose.yml (Simplified)
services:
  plausible:
    image: plausible/analytics:latest
    ports:
      - "8000:8000"
    env_file: .env
...
```
👉 [Open in Self-Hosted Configurator](https://thealtstack.com/self-hosted/plausible) • [Full Self-Hosting Guide](https://docs.thealtstack.com/deployments/plausible)

---

## 🛠️ Browse by Category

- [🏗️ Backend as a Service](#-backend-as-a-service-baas) → [Compare all on thealtstack.com](https://thealtstack.com/category/backend-as-a-service)
- [💬 Communication](#-communication--collaboration) → [Compare all on thealtstack.com](https://thealtstack.com/category/communication)
- [📊 Analytics & BI](#-analytics--bi) → [Compare all on thealtstack.com](https://thealtstack.com/category/analytics)
- [📁 Project Management](#-project-management) → [Compare all on thealtstack.com](https://thealtstack.com/category/project-management)

---

## 📂 The Awesome Alternatives List

### 🏗️ Backend as a Service (BaaS)
*Alternatives to **Firebase** and **AWS Amplify***
- **[Supabase](https://github.com/supabase/supabase)** - The open source Firebase alternative with a dedicated Postgres database.
- **[Appwrite](https://github.com/appwrite/appwrite)** - A complete backend for Flutter, Web, and Mobile developers.
- **[PocketBase](https://github.com/pocketbase/pocketbase)** - Open source realtime backend in 1 file (Go & SQLite).
- [🔗 **Compare BaaS Alternatives on AltStack**](https://thealtstack.com/category/backend-as-a-service)

### 💬 Communication & Collaboration
*Alternatives to **Slack**, **Zoom**, and **Microsoft Teams***
- **[Mattermost](https://github.com/mattermost/mattermost)** - Open source platform for secure collaboration across the SDLC.
- **[Rocket.Chat](https://github.com/RocketChat/Rocket.Chat)** - The Secure CommsOS™ for mission-critical operations.
- **[Jitsi Meet](https://github.com/jitsi/jitsi-meet)** - Fully encrypted, 100% open source video conferencing.
- [🔗 **Explore Communication Stacks on AltStack**](https://thealtstack.com/category/communication)

### 📊 Analytics & BI
*Alternatives to **Google Analytics**, **Mixpanel**, and **Tableau***
- **[Plausible](https://github.com/plausible/analytics)** - Simple, lightweight, and privacy-friendly web analytics.
- **[PostHog](https://github.com/PostHog/posthog)** - Product analytics, session recording, and feature flags.
- **[Matomo](https://github.com/matomo-org/matomo)** - The leading open source Google Analytics alternative.
- **[Metabase](https://github.com/metabase/metabase)** - The simplest way to get business intelligence throughout your company.
- **[Apache Superset](https://github.com/apache/superset)** - Modern data exploration and visualization platform.
- [🔗 **Check Analytics Guides on AltStack**](https://thealtstack.com/category/analytics)

### � Project Management
*Alternatives to **Jira**, **Asana**, and **Monday.com***
- **[Plane](https://github.com/makeplane/plane)** - Beautiful open-source Jira/Linear alternative.
- **[Taiga](https://github.com/taigaio/taiga-back)** - Agile project management for multi-functional teams.
- **[OpenProject](https://github.com/opf/openproject)** - Powerful classic project management and collaboration.
- [🔗 **Self-host Project Management on AltStack**](https://thealtstack.com/category/project-management)

### 🎨 Design & Creative
*Alternatives to **Photoshop**, **Figma**, and **Illustrator***
- **[Penpot](https://github.com/penpot/penpot)** - The open-source design tool for design and code collaboration (Figma alternative).
- **[GIMP](https://github.com/GNOME/gimp)** - Professional-grade photo editing tools (Photoshop alternative).
- **[Krita](https://github.com/KDE/krita)** - Open source digital painting (Illustrator/Corel alternative).
- [🔗 **Design Stacks on AltStack**](https://thealtstack.com/category/design)

### � Productivity & Knowledge
*Alternatives to **Notion**, **Microsoft 365**, and **Google Workspace***
- **[AppFlowy](https://github.com/AppFlowy-IO/AppFlowy)** - Privacy-focused Notion alternative built in Rust.
- **[AFFiNE](https://github.com/toeverything/AFFiNE)** - Next-gen knowledge base that brings planning and creation together.
- **[ONLYOFFICE](https://github.com/ONLYOFFICE/DocumentServer)** - Highly compatible MS Office online editors.
- [🔗 **Productivity Alternatives on AltStack**](https://thealtstack.com/category/productivity)

### 🔐 Security & IAM
*Alternatives to **1Password**, **Auth0**, and **Okta***
- **[Bitwarden](https://github.com/bitwarden/server)** - Open source password manager for individuals and teams.
- **[KeePassXC](https://github.com/keepassxreboot/keepassxc)** - Fully offline, AES-256 password manager.
- **[Keycloak](https://github.com/keycloak/keycloak)** - Open source identity and access management.
- **[Authentik](https://github.com/goauthentik/authentik)** - The overall-best open-source identity provider.
- [🔗 **Security Stacks on AltStack**](https://thealtstack.com/category/security)

### 🛠️ DevOps & Automation
*Alternatives to **Heroku**, **Zapier**, and **Vercel***
- **[Coolify](https://github.com/coollabsio/coolify)** - Self-hostable PaaS alternative to Heroku & Netlify.
- **[n8n](https://github.com/n8n-io/n8n)** - Workflow automation tool with 400+ integrations.
- **[Activepieces](https://github.com/activepieces/activepieces)** - Open source Zapier alternative.
- [🔗 **DevOps Guides on AltStack**](https://thealtstack.com/category/devops)

### � Storage & Infrastructure
*Alternatives to **AWS S3**, **Dropbox**, and **Salesforce***
- **[MinIO](https://github.com/minio/minio)** - High-performance, S3-compatible object storage.
- **[Odoo](https://github.com/odoo/odoo)** - All-in-one ERP suite (Salesforce alternative).
- **[Nextcloud](https://github.com/nextcloud/server)** - Content collaboration platform (Dropbox/Google Drive alternative).
- [🔗 **Infrastructure Stacks on AltStack**](https://thealtstack.com/category/infrastructure)

---

## ⚡ Quick Start: Deploy Your First Alternative

Most tools in this list can be deployed in minutes using Docker. Here is how to get started with the AltStack approach:

1. **Clone this repo**: `git clone https://github.com/altstackHQ/altstack-data.git`
2. **Explore `/deployments`**: Find the Docker Compose file for the tool you want.
3. **Go Sovereign**: Visit [docs.thealtstack.com](https://docs.thealtstack.com) for production-hardened guides (SSL, backups, and reverse proxies).

> [!TIP]
> This repository contains basic community configs. For commercial-grade Sovereign Infrastructure setup, always refer to our [Official Documentation](https://thealtstack.com/docs).

```bash
cd deployments/plausible
docker-compose up -d
```

---

## �️ Directory Mapping (The AltStack Bridge)

We use the data in this repository to power our [Main Website](https://thealtstack.com). Here is how the categories map:

| UI Directory | Data Source (this repo) | Self-Hosted Guide |
| :--- | :--- | :--- |
| [Backend](https://thealtstack.com/category/backend-as-a-service) | `data/baas` | [BaaS Guides](https://docs.thealtstack.com/guides/backend) |
| [Analytics](https://thealtstack.com/category/analytics) | `data/analytics` | [Analytics Guides](https://docs.thealtstack.com/guides/analytics) |
| [Project Management](https://thealtstack.com/category/project-management) | `data/pm` | [PM Guides](https://docs.thealtstack.com/guides/pm) |
| [Communication](https://thealtstack.com/category/communication) | `data/comms` | [Comms Guides](https://docs.thealtstack.com/guides/comms) |
| [Productivity](https://thealtstack.com/category/productivity) | `data/productivity` | [Prod Guides](https://docs.thealtstack.com/guides/productivity) |

---

## 🤝 Contributing

We love contributions! If you know of a great open-source tool we missed:
1. Check the [Contribution Guidelines](CONTRIBUTING.md).
2. Open an Issue with the tool details.
3. Submit a PR to update `data/tools.json`.

---

<p align="center">
  Built with ❤️ by the <a href="https://thealtstack.com">AltStack Team</a>.
</p>
