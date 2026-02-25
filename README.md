<p align="center">
  <img src="assets/logo.png" alt="The Alt Stack" width="80" />
</p>

<h1 align="center">The Alt Stack</h1>

<p align="center">
  <strong>The open-source directory of alternatives to every popular SaaS tool.</strong>
</p>

<p align="center">
  <a href="https://thealtstack.com">🌐 Website</a> · <a href="https://docs.thealtstack.com">📖 Docs</a> · <a href="https://github.com/altstackHQ/altstack-data/issues/new?template=add-tool.yml">➕ Submit a Tool</a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache%202.0%20%2B%20CC%20BY%204.0-blue" alt="License" /></a>
  <img src="https://img.shields.io/badge/tools-459-green" alt="Tools" />
  <img src="https://img.shields.io/badge/categories-28-orange" alt="Categories" />
  <img src="https://img.shields.io/badge/deploy%20guides-66-blueviolet" alt="Guides" />
</p>

---

## What is The Alt Stack?

**The Alt Stack** is a curated, community-driven directory that helps developers and teams discover open-source and self-hosted alternatives to popular SaaS products — across **28 categories** including Project Management, Analytics, CRM, AI, DevOps, Communication, and more.

This repository is the heart of the project. It contains:

- 🗂️ **The Dataset** — 459+ tools with metadata, pricing, pros/cons, deployment info, and links.
- 📖 **66+ Deployment Guides** — Step-by-step self-hosting guides for tools like Plausible, Gitea, Rocket.Chat, and more.
- 📚 **Concepts & Docs** — Guides on topics like server setup, monitoring, backups, and secrets management.

---

## 📁 Repository Structure

```
altstack-data/
├── data/
│   ├── tools.json              # The core dataset (459+ tools)
│   ├── tools-min.json          # Minified version
│   ├── category_editorial.json # Category descriptions & metadata
│   ├── stacks.ts               # Curated stack combinations
│   ├── seo.ts                  # SEO metadata
│   └── schema/
│       └── types.ts            # TypeScript schema for the data
│
├── docs/                       # Full documentation site (Nextra)
│   └── app/
│       ├── deploy/             # 66+ deployment guides
│       ├── concepts/           # Self-hosting concepts
│       ├── quick-start/        # Getting started guides
│       └── stacks/             # Curated stack guides
│
├── assets/
│   └── logos/                  # Tool logos
│
└── .github/
    ├── ISSUE_TEMPLATE/         # Templates for submissions
    └── workflows/              # CI: JSON validation, docs build
```

---

## 🚀 Using the Data

The dataset is just JSON. Use it however you want.

**Fetch it directly:**
```bash
curl -s https://raw.githubusercontent.com/altstackHQ/altstack-data/main/data/tools.json | jq '.[0]'
```

**Use it in JavaScript/TypeScript:**
```typescript
import tools from './data/tools.json';
import type { Tool } from './data/schema/types';

const analytics = tools.filter(t => t.category === 'Analytics');
console.log(`Found ${analytics.length} analytics tools`);
```

**Use it in Python:**
```python
import json

with open('data/tools.json') as f:
    tools = json.load(f)

open_source = [t for t in tools if t.get('is_open_source')]
print(f"{len(open_source)} open source tools available")
```

---

## 🐳 Self-Hosted Deployments

The `deployments/` directory contains **65+ production-ready Docker Compose configurations** for the tools in our directory. 

These are the exact configurations and install scripts used in the [Self-Hosted Guides](https://thealtstack.com/self-hosted) on our main site.

Instead of writing infrastructure code from scratch, you can deploy tools in minutes:
1. Clone this repository (`git clone https://github.com/altstackHQ/altstack-data.git`)
2. Navigate to a tool's folder: `cd altstack-data/deployments/supabase`
3. Run the automated setup script: `./install.sh` 
*(Alternatively, just run `docker compose up -d` if you don't need the setup script)*
4. You're live!

**Contribute to Deployments:** If you have an optimized `docker-compose.yml` or a custom `install.sh` sequence (e.g., generating required passwords, running migrations) for a tool we haven't covered, or you want to improve an existing one, please open a PR!

---

## 🤝 Contributing

We love contributions! Whether it's adding a tool you discovered, fixing a broken link, or writing a deployment guide — every contribution makes the ecosystem better.

**Quick links:**
- [➕ Add a new tool](https://github.com/altstackHQ/altstack-data/issues/new?template=add-tool.yml)
- [🐛 Report a data error](https://github.com/altstackHQ/altstack-data/issues/new?template=fix-data.yml)
- [📝 Propose a new guide](https://github.com/altstackHQ/altstack-data/issues/new?template=add-guide.yml)

Read the full **[Contributing Guidelines](CONTRIBUTING.md)** before submitting a PR.

---

## 📊 Categories

| Category | Category | Category | Category |
|---|---|---|---|
| 💬 Communication | 📊 Analytics | 📋 Project Management | 🤖 AI Interfaces |
| 🧠 AI Models | 💻 AI Coding | 🎨 Creative | 📝 CMS |
| 📧 Email | ☁️ Cloud Hosting | 🗄️ Databases | 🔐 Security |
| 📁 File Storage | 💰 CRM | 🛒 E-commerce | 🎫 Support |
| ⚖️ Legal | 🏗️ ERP | 🔄 DevOps | 📺 Media |

*…and more. Explore the full list at [thealtstack.com](https://thealtstack.com).*

---

## 📄 License

| What | License |
|---|---|
| Code & Scripts | [Apache License 2.0](LICENSE) |
| Data (`/data`) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Documentation (`/docs`) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

All tool logos in `assets/logos/` are the property of their respective trademark holders and are used for identification purposes only.

---

<p align="center">
  <sub>Built with ❤️ by the <a href="https://thealtstack.com/about">Alt Stack team</a></sub>
</p>
