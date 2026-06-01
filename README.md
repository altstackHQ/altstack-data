<div align="center">

# The AltStack — Data HQ

### The open dataset behind [thealtstack.com](https://thealtstack.com)

**488 open-source tools · 32 categories · 352 AI models · 68 Docker deploy configs**

[![Live Directory](https://img.shields.io/badge/Browse-thealtstack.com-ef4444?style=for-the-badge&logo=vercel&logoColor=white)](https://thealtstack.com)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-22c55e?style=for-the-badge)](LICENSE)

</div>

---

## What is this repo?

This is the **data layer** for [The AltStack](https://thealtstack.com) — a curated directory of open-source alternatives to popular SaaS products. Everything the website displays comes from the files in this repo:

- The full tool database (`tools.json`)
- Docker Compose deployment configs for 68+ tools
- Blog content and editorial copy
- Category descriptions and SEO metadata
- Curated "Stack" bundles (pre-built tool combos for common use cases)

If you want to add a tool, fix a description, or contribute a Docker config — this is where you do it.

---

## Repository Structure

```
├── data/
│   ├── tools.json              # The master database — 488 tools, every field
│   ├── tools-min.json          # Minified version (client-side, faster loads)
│   ├── tools_expanded.json     # Expanded version with enriched metadata
│   ├── blog-posts.ts           # Blog post content (15 articles)
│   ├── stacks.ts               # Curated stack definitions (5 bundles)
│   ├── category_editorial.json # Category descriptions, SEO copy, editorial
│   ├── memory.json             # Sentinel pipeline state & run history
│   └── seo.ts                  # Global SEO configuration
├── docker-deploy/              # 68 Docker Compose configs + install scripts
│   ├── supabase/
│   │   ├── docker-compose.yml
│   │   └── install.sh
│   ├── n8n/
│   ├── plausible/
│   ├── mattermost/
│   └── ... (68 tools total)
├── deployments/                # Deployment metadata & generated configs
├── docs/                       # Documentation site source (Nextra)
├── scraper/                    # Python scraper for data enrichment
│   ├── scraper.py
│   └── requirements.txt
├── scripts/
│   └── fetch-github-metadata.js  # GitHub stars/activity enrichment
├── assets/                     # Logos and static assets
├── CONTRIBUTING.md             # How to contribute
├── CRITERIA.md                 # Tool vetting standards
├── CODE_OF_CONDUCT.md          # Community guidelines
└── LICENSE                     # CC BY 4.0
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
  "cons": ["Fewer advanced features than GA4"]
}
```

### Categories (32)

| Category | Tools | Category | Tools |
|---|---|---|---|
| AI Models | 352 | Productivity | 16 |
| DevOps | 9 | Marketing | 9 |
| Security | 9 | Analytics | 8 |
| Cloud Infrastructure | 5 | Communication | 5 |
| Design | 5 | Backend as a Service | 4 |
| CRM | 4 | Automation | 4 |
| Support | 4 | AI Coding | 3 |
| AI Image Generation | 3 | CAD | 3 |
| ERP | 3 | Project Management | 3 |
| AI Interfaces | 2 | AI Video Generation | 2 |
| AI Tools | 2 | API Development | 2 |
| Creative | 2 | E-commerce | 2 |
| Email | 2 | Financial | 2 |
| HR | 2 | Legal | 2 |
| AI Runners | 4 | Monitoring | 6 |
| Photos | 1 | Uncategorized | 8 |

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

Currently covering **68 tools** including: Supabase, Mattermost, Plausible, PostHog, Keycloak, N8N, Immich, Authentik, Metabase, Plane, and many more.

> **Want to add a config?** See [CONTRIBUTING.md](CONTRIBUTING.md). We test every config before merging.

---

## Curated Stacks

Pre-built tool bundles for common use cases, defined in `data/stacks.ts`:

| Stack | What it's for | Monthly savings |
|---|---|---|
| 🚀 **The Bootstrapper** | Full SaaS toolkit for solo founders | ~$310/mo |
| 🎨 **The Designer** | Adobe Creative Cloud replacement | ~$110/mo |
| 🛡️ **The Privacy Stack** | De-Google your life | ~$80/mo |
| 🏢 **The Enterprise** | Full office suite replacement | ~$250/mo |
| 🤖 **The AI Stack** | Self-hosted AI/ML infrastructure | ~$200/mo |

---

## How the Data Stays Fresh

This repo is kept up-to-date by an automated pipeline (the "Sentinel Engine") that runs nightly via GitHub Actions:

1. **Discovery** — Scans GitHub trending, Hacker News, and community submissions for new tools
2. **Validation** — Checks existing entries for dead links, archived repos, and stale projects
3. **Enrichment** — Pulls latest GitHub stars, activity metrics, and metadata
4. **Docker generation** — Auto-generates Docker Compose configs for newly added tools
5. **Content** — Generates blog posts, tool reviews, and comparison pages

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

### Fix data
Found a broken link, wrong pricing, or outdated description? Edit `data/tools.json` and open a PR. Small, targeted fixes are the fastest to merge.

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

## Links

- 🌐 **Website**: [thealtstack.com](https://thealtstack.com)
- 🐛 **Report an issue**: [Open an issue](https://github.com/altstackHQ/altstack-data/issues)
- 📬 **Request a tool**: [Open an issue](https://github.com/altstackHQ/altstack-data/issues/new)

---

<div align="center">

**Built by [@altstackHQ](https://github.com/altstackHQ)**

Stop paying for SaaS you can self-host.

</div>
- [AI Tools Hub](https://cloud1-d4g787x2022795b0b-1435432994.tcloudbaseapp.com/hub.html) - 21 free AI tools, one-time crypto payment, no subscriptions.
