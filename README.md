# AltStack Data

**The open dataset behind [The AltStack](https://thealtstack.com): 162 curated records mapping proprietary SaaS products to self-hostable open-source alternatives — plus 143 Docker Compose configs so you can deploy them yourself.**

[![AltStack — open-source alternatives to SaaS](https://thealtstack.com)](https://thealtstack.com)

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Records: 162](https://img.shields.io/badge/Records-162-brightgreen.svg)](data/tools.json)
[![Open-source alternatives: 114](https://img.shields.io/badge/Open--source-114-blueviolet.svg)](data/tools.json)
[![Proprietary products: 48](https://img.shields.io/badge/Proprietary-48-orange.svg)](data/tools.json)
[![Format: JSON](https://img.shields.io/badge/Format-JSON-yellow.svg)](data/tools.json)
[![CI: validate-data](https://img.shields.io/github/actions/workflow/status/altstackHQ/altstack-data/validate-data.yml?label=CI)](https://github.com/altstackHQ/altstack-data/actions)
[![Data & docs: CC BY-4.0](https://img.shields.io/badge/Data%2Fdocs-CC_BY--4.0-lightgrey.svg)](LICENSE)

## Why altstack-data?

Swapping proprietary SaaS for open-source alternatives is easy to decide and hard to execute. You can find a replacement for Slack or Jira in a blog post, but answering *“Is it maintained? Can I self-host it? What does production deployment look like?”* still takes hours of digging.

AltStack Data does that work once, in plain JSON and Docker Compose. Every record links a proprietary product to its open-source replacements with upstream repo, stars, last commit, license, and — where available — a deployable Compose config. No build step between you and the data.

## Catalog at a glance

| | Metric | Detail |
|---|---|---|
| 📦 | **162 records** | 48 proprietary products + 114 open-source alternatives |
| 🏷️ | **32 categories** | From AI & LLMs to CRM, analytics, and design tools |
| 🐳 | **143 Docker Compose configs** | 68 include an `install.sh` for one-command deployment |
| 📚 | **65 deployment guides** | Nextra docs source, per-tool setup walkthroughs |
| 📝 | **18 blog posts + 5 curated stacks** | Long-form comparisons and opinionated starter bundles |
| 🔄 | **Source of truth** | [`data/tools.json`](data/tools.json), refreshed nightly |

**Use it:** [`data/tools.json`](data/tools.json) · **Deploy it:** [one Compose file](#deploy-a-tool) · **Improve it:** [CONTRIBUTING.md](CONTRIBUTING.md)

## Table of contents

- [Quick start](#quick-start)
- [What the data looks like](#what-the-data-looks-like)
- [Used in / examples](#used-in--examples)
- [Schema & field reference](#schema--field-reference)
- [Deploy a tool](#deploy-a-tool)
- [Contributing](#contributing)
- [Citation](#citation)
- [Data quality and limits](#data-quality-and-limits)
- [FAQ](#faq)
- [Roadmap](#roadmap)
- [Community & follow](#community--follow)
- [License](#license)

## Quick start

1. **Get the data.** Clone the repo, or just pull the canonical file:

   ```bash
   git clone https://github.com/altstackHQ/altstack-data.git
   cd altstack-data
   # or: curl -O https://raw.githubusercontent.com/altstackHQ/altstack-data/main/data/tools.json
   ```

2. **Load it.** `tools.json` is a plain JSON array — no build step:

   ```js
   const SOURCE = 'data/tools.json';
   const tools = await fetch(SOURCE).then((r) => r.json());
   console.log(`Loaded ${tools.length} records`);
   ```

3. **Show the first record:**

   ```js
   console.log(JSON.stringify(tools[0], null, 2));
   ```

   Expected output (first record in the current snapshot):

   ```json
   {
     "slug": "firebase",
     "name": "Firebase",
     "category": "Backend as a Service",
     "is_open_source": false,
     "pricing_model": "Paid/Freemium",
     "website": "https://firebase.google.com",
     "description": "Google's app development platform.",
     "alternatives": ["supabase", "appwrite", "pocketbase"],
     "avg_monthly_cost": 25,
     "has_deployable_alternative": true
   }
   ```

   The data is a graph, not a flat list: a proprietary record points to its open-source replacements by `slug` in `alternatives`.

## What the data looks like

A rendered preview of three real proprietary → open-source pairs. Logo images are placeholders under `assets/logos/<slug>.svg`.

| Proprietary product | Open-source alternative | Category | Deploy config |
|---|---|---|---|
| ![Zoom logo](assets/logos/zoom.svg) Zoom | ![Jitsi Meet logo](assets/logos/jitsi-meet.svg) Jitsi Meet | Communication | `docker-compose` |
| ![Jira logo](assets/logos/jira.svg) Jira | ![Plane logo](assets/logos/plane.svg) Plane | Project Management | `docker-compose` |
| ![Firebase logo](assets/logos/firebase.svg) Firebase | ![Supabase logo](assets/logos/supabase.svg) Supabase | Backend as a Service | `docker-compose` |

Every open-source record above carries `github_repo`, `stars`, `last_commit`, `language`, `license`, and — where available — a `deployment` object pointing at `docker-deploy/<slug>/`.

## Used in / examples

The data is intentionally generic so you can build on it. Three short downstream snippets:

### 1. Build an internal approved-software list

List every open-source tool that has a deployable Compose config, ready for an internal tech-catalog:

```js
const approved = tools
  .filter((t) => t.is_open_source && t.deployment)
  .map((t) => ({ name: t.name, category: t.category, path: t.deployment.local_path }));
console.log(`${approved.length} deployable open-source tools`);
// Example: 94 deployable open-source tools (current snapshot)
```

### 2. Compare SaaS spend vs self-hosted

Sum the reference monthly cost of proprietary products and compare with their open-source replacements (which self-host at $0 license cost):

```js
const proprietary = tools.filter((t) => !t.is_open_source && t.avg_monthly_cost);
const saasSpend = proprietary.reduce((sum, t) => sum + (t.avg_monthly_cost || 0), 0);
console.log(`Reference SaaS spend: $${saasSpend}/mo`);
console.log(`Self-hosted replacement: $0 license fees (infrastructure only)`);
// Example: reference SaaS spend varies per snapshot; open-source replacements carry avg_monthly_cost: null
```

### 3. Find a Slack alternative

Resolve a proprietary product to the open-source projects that replace it:

```js
const slack = tools.find((t) => t.slug === 'slack');
const alternatives = slack.alternatives
  .map((slug) => tools.find((t) => t.slug === slug))
  .filter(Boolean);
console.log(`${slack.name} →`, alternatives.map((t) => t.name).join(', '));
// Slack → Mattermost, Rocket.Chat
```

## Schema & field reference

<details>
<summary>Click to expand the field reference</summary>

All records share `slug`, `name`, `category`, `is_open_source`, `description`, `pros`, and `cons`; every other field is present where it applies. Counts are for the current snapshot (`data/tools.json` is the source of truth; counts drift as records are added).

| Field | Type | Present | Meaning |
|---|---|---|---|
| `slug` | string | 162 | Stable identifier used by cross-links |
| `name` | string | 162 | Display name |
| `category` | string | 162 | One of 32 named categories or `Uncategorized` |
| `is_open_source` | boolean | 162 | `false` marks the proprietary reference product |
| `alternatives` | string[] | 63 | Open-source slugs that replace this record |
| `deployment` | object | 94 | `{ type, local_path }`; `type` is `docker-compose` |
| `stars` | number | 114 | GitHub stars at last refresh (open-source records) |
| `last_commit` | ISO date | 107 | Upstream last-commit timestamp at last refresh |
| `github_repo` | string | 114 | Upstream `owner/repo` |
| `license` | string | 114 | Upstream project license (not this repository's license) |
| `website` | string | 160 | Canonical site |
| `pricing_model` / `avg_monthly_cost` | string / number | 54 / 73 | Pricing for proprietary records |

The data is a graph, not a flat list: a proprietary record points to open-source records by `slug`.

```js
const SOURCE = 'https://raw.githubusercontent.com/altstackHQ/altstack-data/main/data/tools.json';
const tools = await fetch(SOURCE).then((response) => response.json());

// Resolve a proprietary product to the open-source tools that replace it.
const slack = tools.find((tool) => tool.slug === 'slack');
const alternatives = slack.alternatives
  .map((slug) => tools.find((tool) => tool.slug === slug))
  .filter(Boolean)
  .map((tool) => ({
    name: tool.name,
    category: tool.category,
    deploy: tool.deployment?.type ?? null,
  }));

console.log(alternatives);
// [
//   { name: 'Mattermost', category: 'Communication', deploy: 'docker-compose' },
//   { name: 'Rocket.Chat', category: 'Communication', deploy: 'docker-compose' }
// ]
```

Related datasets — do not treat these three files as interchangeable formats of one dataset:

- [`data/tools-min.json`](data/tools-min.json) is a separate 488-record client-side index (minified).
- [`data/tools_expanded.json`](data/tools_expanded.json) is a separate 199-record AI-model dataset with richer fields (`hardware_req`, `ai_metadata`, ...). It shares no slugs with `tools.json`.

</details>

## Deploy a tool

Pick a tool, run one command. Every config targets a single server with Docker Compose — no Kubernetes.

```bash
cd docker-deploy/plausible
cat docker-compose.yml        # inspect first, then swap in your own secrets
docker compose up -d
```

68 of the 143 configs also ship an installer:

```bash
cd docker-deploy/plausible
less install.sh               # read before running
./install.sh
```

Before you run any config:

- **Read it first.** Several compose files ship with placeholder or default credentials (for example `replace-me-with-a-secure-random-string` and `POSTGRES_PASSWORD=plausible`). Set your own secrets before exposing a service.
- **Some installers change your machine.** The scripts install Docker system-wide via `get.docker.com` if Docker is missing.
- **CI does not execute these configs.** JSON syntax is checked; the Compose files are not started in CI. Review is on you.
- **Check the guide.** Where available, `docs/app/deploy/<slug>/page.mdx` documents the specific setup.

## Contributing

Three useful paths, in order of size:

**Fix a record.** Correct a URL, price, description, or stale field in [`data/tools.json`](data/tools.json). Use an existing record as the template. Keep the PR to one record where possible.

**Add a tool.** Check [CRITERIA.md](CRITERIA.md) first. A proprietary record needs `slug`, `name`, `category`, `is_open_source: false`, pricing context, and an `alternatives` array of open-source slugs. An open-source record needs the core fields plus `github_repo` and, when available, `deployment`. There is no machine-readable JSON Schema yet; the field reference above is the contract.

**Add a deployment config.** Create `docker-deploy/<slug>/docker-compose.yml`; add `install.sh` only if you can support it. Never commit real secrets. A docs guide goes in `docs/app/deploy/<slug>/page.mdx`, registered in the adjacent `_meta.ts`.

Before opening a PR:

1. Keep the change focused and explain why the data is wrong or incomplete.
2. Validate JSON locally the same way CI does: `jq empty data/*.json`.
3. Do not mix a data change with unrelated docs or config changes.
4. Read the full guide in [CONTRIBUTING.md](CONTRIBUTING.md).

A good first contribution is a broken link or an outdated price in a single record. You do not need to add a tool to help.

Land a fix and you belong in this list; add yourself in the same pull request if you like.

## Contributors

The catalog is maintained by [Aditya](https://github.com/aa-humaaan) and everyone who sent a fix.

<table>
  <tr>
    <td align="center"><a href="https://github.com/braedonsaunders"><img src="https://github.com/braedonsaunders.png" width="40px;" alt=""/><br /><sub><b>Braedon Saunders</b></sub></a></td>
    <td align="center"><a href="https://github.com/mikececco"><img src="https://github.com/mikececco.png" width="40px;" alt=""/><br /><sub><b>Mike Cecconello</b></sub></a></td>
    <td align="center"><a href="https://github.com/nadyyym"><img src="https://github.com/nadyyym.png" width="40px;" alt=""/><br /><sub><b>Vlad Nadymov</b></sub></a></td>
    <td align="center"><a href="https://github.com/benjiwagner"><img src="https://github.com/benjiwagner.png" width="40px;" alt=""/><br /><sub><b>Benjamin Wagner</b></sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/imshashank"><img src="https://github.com/imshashank.png" width="40px;" alt=""/><br /><sub><b>Shashank Agarwal</b></sub></a></td>
    <td align="center"><a href="https://github.com/alichherawalla"><img src="https://github.com/alichherawalla.png" width="40px;" alt=""/><br /><sub><b>Mohammed Ali Chherawalla</b></sub></a></td>
    <td align="center"><a href="https://github.com/sridharkalaibala"><img src="https://github.com/sridharkalaibala.png" width="40px;" alt=""/><br /><sub><b>Sridhar Bala</b></sub></a></td>
    <td align="center"><a href="https://github.com/unjica"><img src="https://github.com/unjica.png" width="40px;" alt=""/><br /><sub><b>Sanja Malovic</b></sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/1146345502"><img src="https://github.com/1146345502.png" width="40px;" alt=""/><br /><sub><b>QY</b></sub></a></td>
    <td align="center"><a href="https://github.com/PrinceAdvant"><img src="https://github.com/PrinceAdvant.png" width="40px;" alt=""/><br /><sub><b>PrinceAdvant</b></sub></a></td>
    <td align="center"><a href="https://github.com/cevheri"><img src="https://github.com/cevheri.png" width="40px;" alt=""/><br /><sub><b>Mehmet Cevheri BOZOGLAN</b></sub></a></td>
    <td align="center"><a href="https://github.com/JesusPaz"><img src="https://github.com/JesusPaz.png" width="40px;" alt=""/><br /><sub><b>Jesus Paz</b></sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/edvaldofreitas"><img src="https://github.com/edvaldofreitas.png" width="40px;" alt=""/><br /><sub><b>Edvaldo Freitas</b></sub></a></td>
    <td align="center"><a href="https://github.com/sosidudku1"><img src="https://github.com/sosidudku1.png" width="40px;" alt=""/><br /><sub><b>Dudka</b></sub></a></td>
    <td align="center"><a href="https://github.com/BlueSkyID666"><img src="https://github.com/BlueSkyID666.png" width="40px;" alt=""/><br /><sub><b>BlueSkyID666</b></sub></a></td>
    <td align="center"><a href="https://github.com/aagarwal1012"><img src="https://github.com/aagarwal1012.png" width="40px;" alt=""/><br /><sub><b>Ayush Agarwal</b></sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/arsalann"><img src="https://github.com/arsalann.png" width="40px;" alt=""/><br /><sub><b>Arsalan</b></sub></a></td>
  </tr>
</table>

Several contributions were restored by hand after the sync incidents documented in [INCIDENTS.md](INCIDENTS.md). Thank you for sending them anyway — nobody owed this repository a second fix.

Nightly metadata refreshes run under `github-actions[bot]` (the Sentinel pipeline) and are credited as pipeline, not authorship.

## Citation

If you use this dataset in research or a product, please cite it:

```bibtex
@misc{altstack-data,
  author = {Aditya},
  title = {The AltStack Data},
  year = {2026},
  publisher = {GitHub},
  howpublished = {\url{https://github.com/altstackHQ/altstack-data}},
  note = {Apache-2.0 (code); CC BY-4.0 (data and documentation)}
}
```

## Data quality and limits

- **Community-maintained.** Metadata refreshes nightly; prose, categories, and deploy configs change when someone contributes a fix.
- **Syntax validation, not schema validation.** CI proves the JSON parses. No automated schema or semantic check exists yet.
- **Not a security audit.** Inclusion does not mean a project is secure, complete, or production-ready. [CRITERIA.md](CRITERIA.md) lists the editorial bar — and what is not vetted.
- **Upstream facts drift.** `stars`, `last_commit`, `language`, and `license` are snapshots from the last refresh. Verify licenses and maintenance status at the source before relying on them.
- **Deployment configs are not tested in CI.** Treat them as reviewed starting points, not guarantees. Change default credentials.
- **Some links are partner links.** 73 records include an optional `referral_url`; it does not affect inclusion and can be removed.
- **Trademarks belong to their owners.** Names and logos in [`assets/logos/`](assets/logos) identify third-party projects and are not licensed with this repository.
- **Coverage is curated, not exhaustive.** 162 records is a selected catalog, not every open-source project.

Found an error? Open an issue or send a one-record pull request. Small, targeted fixes are the fastest to review.

## FAQ

**Is this data free for commercial use?**
Yes. The repository code is licensed under Apache-2.0, and the data (`data/*`) plus documentation (`docs/*`) are CC BY 4.0. You're free to use both commercially — just give attribution. See [License](#license) below.

**How often is the data updated?**
The Sentinel Engine runs nightly via GitHub Actions (discovery, validation, enrichment, Docker config generation). Community PRs are merged continuously, so the catalog changes weekly.

**Can I submit a tool?**
Yes. Fork the repo, add an entry to `data/tools.json` following the [vetting criteria](CRITERIA.md), and open a PR. Prefer to just request one? Open an issue instead.

**What's the difference between `tools.json`, `tools-min.json`, and `tools_expanded.json`?**
- `tools.json` — The master database, every field (162 records).
- `tools-min.json` — Minified, smaller payload for client-side / faster loads.
- `tools_expanded.json` — Expanded version with enriched metadata.

**Are the Docker configs production-ready?**
Each config in `docker-deploy/` is a `docker-compose.yml` + `install.sh` pair tested before merging. Review environment variables, secrets, and resource limits before pointing them at production.

## Roadmap

- Expand coverage across more categories and tools
- Verified, production-tested deploy configs with health checks
- Search UI on [thealtstack.com](https://thealtstack.com)
- Side-by-side tool comparison pages
- More curated “Stack” bundles
- Harder automated dead-link and stale-repo detection

## Community & follow

- 🐛 **Issues / bugs**: [Open an issue](https://github.com/altstackHQ/altstack-data/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/altstackHQ/altstack-data/discussions)
- 📬 **Request a tool**: [New issue](https://github.com/altstackHQ/altstack-data/issues/new)
- 🌐 **Live directory**: [thealtstack.com](https://thealtstack.com)

## Sponsor

Support open-source alternatives to SaaS. Become a sponsor: [GitHub Sponsors](https://github.com/sponsors/altstackHQ)

## License

- **Repository code**: Apache-2.0
- **Data & documentation** (`data/*`, `docs/*`): CC BY 4.0 — free to use, attribution required
- **Third-party trademarks**: belong to their respective owners; inclusion does not imply endorsement

<sup>Maintained by Aditya · [thealtstack.com](https://thealtstack.com)</sup>