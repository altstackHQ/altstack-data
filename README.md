<div align="center">

# The AltStack — Data HQ

### The open dataset behind [thealtstack.com](https://thealtstack.com)

**148 open-source tools · 32 categories · 143 Docker deploy configs · 20 blog posts · 5 curated stacks**

[![Live Directory](https://img.shields.io/badge/Browse-thealtstack.com-ef4444?style=for-the-badge&logo=vercel&logoColor=white)](https://thealtstack.com)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-22c55e?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/altstackHQ/altstack-data?style=for-the-badge&logo=github)](https://github.com/altstackHQ/altstack-data/stargazers)
[![Forks](https://img.shields.io/github/forks/altstackHQ/altstack-data?style=for-the-badge&logo=github)](https://github.com/altstackHQ/altstack-data/network/members)

> **Note:** Website v2 is currently in progress. The data layer is fully active and accepting contributions.

</div>

---

## What is this repo?

This is the **data layer** for [The AltStack](https://thealtstack.com) — a curated directory of open-source alternatives to popular SaaS products. Everything the website displays comes from the files in this repo:

- The full tool database (`tools.json`)
- Docker Compose deployment configs for 143 tools
- Blog content and editorial copy (20 articles)
- Category descriptions and SEO metadata
- Curated "Stack" bundles (5 pre-built tool combos)
- Full documentation site (Nextra)

If you want to add a tool, fix a description, or contribute a Docker config — this is where you do it.

---

## Repository Structure

```
├── data/
│   ├── tools.json                    # Master database — 148 tools, every field
│   ├── tools-min.json                # Minified version (client-side, faster loads)
│   ├── tools_expanded.json           # Expanded version with enriched metadata
│   ├── tools_expanded-min.json       # Minified expanded version
│   ├── blog-posts.ts                 # Blog post content (20 articles)
│   ├── stacks.ts                     # Curated stack definitions (5 bundles)
│   ├── category_editorial.json       # Category descriptions, SEO copy, editorial
│   ├── seo.ts                        # VS pair generation (proprietary vs open-source)
│   ├── memory.json                   # Sentinel pipeline state & run history
│   ├── memory-min.json               # Minified pipeline state
│   ├── cortex-memory.json            # Sentinel memory & context
│   ├── bundled-docker-templates.json # Pre-built Docker templates
│   └── bundled-docker-templates-min.json
├── docker-deploy/                    # 143 Docker Compose configs + install scripts
│   ├── supabase/
│   │   ├── docker-compose.yml
│   │   └── install.sh
│   ├── n8n/
│   ├── plausible/
│   ├── mattermost/
│   └── ... (143 tools total)
├── deployments/                      # Deployment metadata & generated configs (68 entries)
├── docs/                             # Documentation site source (Nextra)
│   ├── app/
│   │   ├── concepts/                 # Self-hosting concepts
│   │   │   ├── backups/
│   │   │   ├── docker-basics/
│   │   │   ├── env-secrets/
│   │   │   ├── hardware/
│   │   │   ├── monitoring/
│   │   │   ├── networking/
│   │   │   ├── reverse-proxies/
│   │   │   ├── ssl-tls/
│   │   │   └── updates/
│   │   ├── deploy/                   # 68 tool-specific deployment guides
│   │   ├── quick-start/              # Getting started guides
│   │   │   ├── choosing-a-server/
│   │   │   ├── first-deployment/
│   │   │   ├── reverse-proxy/
│   │   │   ├── starter-kit/
│   │   │   └── what-is-self-hosting/
│   │   ├── stacks/                   # Stack pages
│   │   │   ├── ai-first/
│   │   │   ├── bootstrapper/
│   │   │   ├── designer/
│   │   │   ├── devops/
│   │   │   └── privacy/
│   │   ├── why/                      # Why self-host
│   │   └── contact/                  # Contact page
│   ├── components/                   # Shared components
│   │   ├── AIChatLinks.tsx
│   │   └── ContactForm.tsx
│   └── public/                       # Static files
│       ├── llms.txt
│       ├── llms-full.txt
│       ├── robots.txt
│       └── _pagefind/
├── scraper/                          # Python scraper for data enrichment
│   ├── scraper.py
│   └── requirements.txt
├── scripts/
│   └── fetch-github-metadata.js      # GitHub stars/activity enrichment
├── assets/                           # Logos and static assets
│   ├── logo.png
│   └── logos/
├── .github/
│   ├── CODEOWNERS                    # Code ownership
│   ├── ISSUE_TEMPLATE/               # Issue templates
│   │   ├── add-guide.yml
│   │   ├── add-tool.yml
│   │   ├── fix-data.yml
│   │   └── tool-submission.yml
│   ├── pull_request_template.md      # PR template with checklist
│   └── workflows/                    # CI/CD automation
│       ├── validate-data.yml         # JSON validation on push/PR
│       ├── scrape-data.yml           # Nightly GitHub data enrichment
│       ├── sync-to-main-app.yml      # Sync to thealtstack repo
│       ├── check-docs.yml            # Docs build check
│       └── redeploy-site.yml         # Vercel deploy trigger
├── CONTRIBUTING.md                   # How to contribute
├── CRITERIA.md                       # Tool vetting standards
├── CODE_OF_CONDUCT.md                # Community guidelines
├── SECURITY.md                       # Security policy
└── LICENSE                           # CC BY 4.0
```

---

## The Data: `tools.json`

The core of this repo. Each tool entry looks like this:

```json
{
  "slug": "plausible",
  "name": "Plausible Analytics",
  "category": "Analytics",
  "is_open_source": true,
  "pricing_model": "Free Self-Hosted / Paid Cloud",
  "website": "https://plausible.io",
  "description": "Lightweight and privacy-friendly Google Analytics alternative.",
  "alternatives": ["Google Analytics", "Mixpanel"],
  "tags": ["analytics", "privacy", "self-hosted"],
  "logo_url": "https://...",
  "avg_monthly_cost": 0,
  "pros": ["Privacy-first", "Lightweight script", "Easy to self-host"],
  "cons": ["Fewer advanced features than GA4"],
  "stars": 29314,
  "language": "Elixir",
  "license": "AGPL-3.0",
  "last_commit": "2026-10-04T18:42:06Z"
}
```

### Categories (32)

| Category | Tools | Category | Tools |
|---|---|---|---|
| Productivity | 16 | Security | 9 |
| DevOps | 9 | Marketing | 9 |
| AI Models | 9 | Analytics | 8 |
| Uncategorized | 8 | Monitoring | 7 |
| Communication | 5 | Design | 5 |
| Automation | 5 | Cloud Infrastructure | 5 |
| Backend as a Service | 4 | CRM | 4 |
| Project Management | 4 | Support | 4 |
| AI Runners | 4 | ERP | 3 |
| CAD | 3 | AI Image Generation | 3 |
| AI Coding | 3 | HR | 2 |
| E-commerce | 2 | Legal | 2 |
| Financial | 2 | Creative | 2 |
| AI Video Generation | 2 | AI Interfaces | 2 |
| AI Tools | 2 | API Development | 2 |
| Email | 2 | Photos | 1 |

---

## Docker Deploy Configs

Every config in `docker-deploy/` is a ready-to-use `docker-compose.yml` with an accompanying `install.sh` script. Just clone and run:

```bash
cd docker-deploy/plausible
chmod +x install.sh
./install.sh
```

Or copy the `docker-compose.yml` directly:

```bash
cd docker-deploy/n8n
docker compose up -d
```

Currently covering **143 tools** including: Supabase, Mattermost, Plausible, PostHog, Keycloak, N8N, Immich, Authentik, Metabase, Plane, Coolify, Dokku, and many more.

Each tool also has a dedicated deployment guide in `docs/app/deploy/<tool-slug>/`.

> **Want to add a config?** See [CONTRIBUTING.md](CONTRIBUTING.md). We test every config before merging.

---

## Curated Stacks

Pre-built tool bundles for common use cases, defined in `data/stacks.ts`:

| Stack | Tagline | What it's for | Monthly Savings |
|---|---|---|---|
| 🚀 **The Bootstrapper** | Launch for $0/mo | Full SaaS toolkit for solo founders | ~$310/mo |
| 🎨 **The Designer** | Ditch Creative Cloud | Adobe Creative Cloud replacement | ~$110/mo |
| 🤖 **The AI-First** | Own your AI | Self-hosted LLMs, image gen, code completion | ~$69/mo |
| ⚙️ **The DevOps** | Self-host everything | Full infrastructure on your own terms | ~$375/mo |
| 🔒 **The Privacy** | Zero data leaks | 100% self-hostable, no third-party servers | ~$185/mo |

---

## Documentation Site

The full documentation site is built with [Nextra](https://nextra.site/) and lives in `docs/`. It includes:

- **Concepts** — Self-hosting fundamentals: backups, Docker basics, env secrets, hardware, monitoring, networking, reverse proxies, SSL/TLS, updates
- **Deploy Guides** — 68 tool-specific deployment walkthroughs
- **Quick Start** — Choosing a server, first deployment, reverse proxy setup, starter kit, what is self-hosting
- **Stacks** — Detailed pages for each curated stack
- **Why** — Why self-host
- **Contact** — Contact form

---

## Automation: The Sentinel Engine

This repo is kept up-to-date by an automated pipeline called the **Sentinel Engine**, running via GitHub Actions:

| Workflow | What it does | Trigger |
|---|---|---|
| `validate-data.yml` | Validates all JSON in `data/` | Push/PR to `data/**` |
| `scrape-data.yml` | Nightly GitHub metadata enrichment (stars, commits, language, license) | Cron: daily at midnight UTC |
| `sync-to-main-app.yml` | Syncs `data/` and `docker-deploy/` to the main thealtstack repo | Push to `main` |
| `check-docs.yml` | Builds the Nextra docs site | PR to `docs/**` |
| `redeploy-site.yml` | Triggers Vercel deploy hook | Push to `main` |

The pipeline opens PRs automatically so everything gets reviewed before merging.

---

## Contributing

We welcome contributions! The most impactful ways to help:

### Add a new tool
1. Fork this repo
2. Add a new entry to `data/tools.json` following the schema above
3. Make sure it meets our [vetting criteria](CRITERIA.md)
4. Open a PR

### Add a Docker config
1. Create a new folder in `docker-deploy/` named after the tool's slug
2. Add a `docker-compose.yml` and an `install.sh`
3. Test it locally — it should produce a working deployment
4. Open a PR

### Add a deployment guide
1. Create a new folder in `docs/app/deploy/<tool-slug>/`
2. Write an `.mdx` guide
3. Add it to `docs/app/deploy/_meta.ts`
4. Open a PR

### Fix data
Found a broken link, wrong pricing, or outdated description? Edit `data/tools.json` and open a PR. Small, targeted fixes are the fastest to merge.

### Write a blog post
1. Add a new entry to `data/blog-posts.ts`
2. Follow the existing format
3. Open a PR

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

---

## Using the Data

The data in this repo is licensed under [CC BY 4.0](LICENSE). You're free to use it in your own projects — just give attribution.

### Fetch the raw JSON

```bash
# Full database
curl -O https://raw.githubusercontent.com/altstackHQ/altstack-data/main/data/tools.json

# Minified (smaller, for client-side use)
curl -O https://raw.githubusercontent.com/altstackHQ/altstack-data/main/data/tools-min.json

# Expanded (with enriched metadata)
curl -O https://raw.githubusercontent.com/altstackHQ/altstack-data/main/data/tools_expanded.json
```

### Use in JavaScript/TypeScript

```ts
const response = await fetch(
  'https://raw.githubusercontent.com/altstackHQ/altstack-data/main/data/tools.json'
);
const tools = await response.json();

// Filter by category
const analytics = tools.filter(t => t.category === 'Analytics');

// Find alternatives to a specific SaaS
const slackAlts = tools.filter(t =>
  t.alternatives?.includes('Slack')
);
```

---

## Contributors

Thanks to everyone who has contributed to this project:

| Contributor | Commits | Contributor | Commits |
|---|---|---|---|
| [@aa-humaaan](https://github.com/aa-humaaan) | 44 | [@nadyyym](https://github.com/nadyyym) | 2 |
| [@benjiwagner](https://github.com/benjiwagner) | 2 | [@arsalann](https://github.com/arsalann) | 1 |
| [@aagarwal1012](https://github.com/aagarwal1012) | 1 | [@BlueSkyID666](https://github.com/BlueSkyID666) | 1 |
| [@sosidudku1](https://github.com/sosidudku1) | 1 | [@JesusPaz](https://github.com/JesusPaz) | 1 |
| [@cevheri](https://github.com/cevheri) | 1 | [@mikececco](https://github.com/mikececco) | 1 |
| [@1146345502](https://github.com/1146345502) | 1 | [@unjica](https://github.com/unjica) | 1 |
| [@sridharkalaibala](https://github.com/sridharkalaibala) | 1 | [@alichherawalla](https://github.com/alichherawalla) | 1 |
| [@imshashank](https://github.com/imshashank) | 1 | | |

---

## Links

- 🌐 **Website**: [thealtstack.com](https://thealtstack.com)
- 📖 **Documentation**: [docs/](./docs/)
- 🐛 **Report an issue**: [Open an issue](https://github.com/altstackHQ/altstack-data/issues)
- 📬 **Request a tool**: [Open an issue](https://github.com/altstackHQ/altstack-data/issues/new)

---

<div align="center">

**Built by [@altstackHQ](https://github.com/altstackHQ)**

Stop paying for SaaS you can self-host.

</div>
