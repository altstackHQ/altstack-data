# The AltStack Data

**The open dataset behind [The AltStack](https://thealtstack.com): 162 curated records that map proprietary SaaS products to self-hostable open-source alternatives, plus 143 Docker Compose deployment configs.**

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![JSON syntax](https://img.shields.io/github/actions/workflow/status/altstackHQ/altstack-data/validate-data.yml?label=JSON%20syntax)](https://github.com/altstackHQ/altstack-data/actions/workflows/validate-data.yml)

Finding an open-source alternative is the easy part. Knowing which projects actually replace the tool you use, whether they are still maintained, and how to run them is the work. This repository keeps that work in plain JSON and Compose files — no build step between you and the data.

**Use it:** [raw JSON](#use-the-data) · **Deploy it:** [one Compose file](#deploy-a-tool) · **Improve it:** [CONTRIBUTING.md](CONTRIBUTING.md)

## What this is

The AltStack Data is a two-sided catalog:

- **48 proprietary products** (Slack, Jira, Notion, Figma, Salesforce, ...) with pricing context and, where applicable, the open-source projects that replace them.
- **114 open-source projects** (Supabase, Appwrite, PocketBase, Mattermost, Rocket.Chat, ...) with upstream repo, stars, language, license, a last-commit timestamp where available, and — where available — a deployment config.

Records live in [`data/tools.json`](data/tools.json). The website is one consumer; the data is not locked to it. Use it to build a directory, a comparison page, a self-hosting guide, or an internal approved-software list — or simply to check whether a project is still maintained before you adopt it. A shared, structured dataset means one correction can reach every consumer.

What this is **not**: a hosting service, a security audit, or a promise that a project is production-ready. Inclusion is an editorial judgment. [CRITERIA.md](CRITERIA.md) describes the bar; [Data quality and limits](#data-quality-and-limits) describes the caveats.

## At a glance

*Current `main` snapshot (October 2026). [`data/tools.json`](data/tools.json) is the source of truth; counts drift as records are added.*

| Artifact | Contents |
| --- | --- |
| `data/tools.json` | 162 curated records — 114 open-source projects + 48 proprietary products |
| Categories | 32 named categories, plus an `Uncategorized` bucket |
| `docker-deploy/` | 143 Docker Compose configs; 68 include an `install.sh` |
| `deployments/` | Generated deployment bundles for those 68 installer-ready tools |
| `docs/` | Nextra docs source: 65 deployment guides (91 MDX pages total) |
| `data/category_editorial.json` | Editorial and SEO copy for 30 categories |
| `data/blog-posts.ts` | 18 long-form posts |
| `data/stacks.ts` | 5 curated stacks |

## Use the data

The canonical file is [`data/tools.json`](data/tools.json). Fetch it from `main`:

```bash
curl -O https://raw.githubusercontent.com/altstackHQ/altstack-data/main/data/tools.json
```

`main` moves when the nightly metadata job runs. For reproducible builds, pin a commit SHA or tag instead of `main`.

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

// Filtering is plain array work.
// 9 Analytics records and 94 open-source tools with a deploy config in this snapshot.
const analytics = tools.filter((tool) => tool.category === 'Analytics');
const deployable = tools.filter((tool) => tool.is_open_source && tool.deployment);
console.log({ analytics: analytics.length, deployable: deployable.length });
// { analytics: 9, deployable: 94 }
```

### Field reference

All records share `slug`, `name`, `category`, `is_open_source`, `description`, `pros`, and `cons`; every other field is present where it applies. Counts are for the current 162-record snapshot.

| Field | Type | Present | Meaning |
| --- | --- | --- | --- |
| `slug` | string | 162 | Stable identifier used by cross-links |
| `name` | string | 162 | Display name |
| `category` | string | 162 | One of 32 named categories or `Uncategorized` |
| `is_open_source` | boolean | 162 | `false` marks the proprietary reference product |
| `website` | string | 160 | Canonical site |
| `description` | string | 162 | Short description |
| `pros` / `cons` | string[] | 162 | Editorial notes |
| `logo_url` | string | 160 | Path under `assets/` or a remote URL |
| `tags` | string[] | 56 | Free-form tags |
| `alternatives` | string[] | 66 | Open-source slugs that replace this record, where applicable |
| `pricing_model` | string | 54 | Pricing summary for proprietary records |
| `avg_monthly_cost` | number | 73 | Reference monthly cost, USD |
| `github_repo` | string | 114 | Upstream `owner/repo` for open-source records |
| `stars` | number | 114 | GitHub stars at last refresh |
| `last_commit` | ISO date | 107 | Upstream last-commit timestamp at last refresh |
| `language` | string | 114 | Upstream primary language |
| `license` | string | 114 | Upstream project license (not this repository's license) |
| `deployment` | object | 94 | `{ type, local_path }`; `type` is `docker-compose` |
| `referral_url` | string | 73 | Optional partner/referral link; safe to ignore |
| `sentinel_verdict` | object | 100 | Automation provenance for the record |

Related datasets:

- [`data/tools-min.json`](data/tools-min.json) is a **separate 488-record client-side index** (minified). It is not a minified copy of `tools.json`.
- [`data/tools_expanded.json`](data/tools_expanded.json) is a **separate 199-record AI-model dataset** with richer fields (`hardware_req`, `ai_metadata`, ...). It shares no slugs with `tools.json`.

Do not treat these three files as interchangeable formats of one dataset.

## Deploy a tool

Configs target a single server, not Kubernetes. You need Docker with the Compose plugin.

```bash
cd docker-deploy/plausible
cat docker-compose.yml          # inspect, then change any default credentials
docker compose up -d
```

68 of the 143 configs also ship an installer:

```bash
cd docker-deploy/plausible
less install.sh                  # read it before running it
./install.sh
```

Before you run any config:

- **Read it first.** Several compose files ship with placeholder or default credentials (for example `replace-me-with-a-secure-random-string` and `POSTGRES_PASSWORD=plausible`). Set your own secrets before exposing a service.
- **Some installers change your machine.** The scripts install Docker system-wide via `get.docker.com` if Docker is missing.
- **CI does not execute these configs.** JSON syntax is checked; the Compose files are not started in CI. Review is on you.
- **Check the guide.** Where available, `docs/app/deploy/<slug>/page.mdx` documents the specific setup.

## Repository map

```
data/tools.json                 # canonical catalog (162 records)
data/tools-min.json             # separate 488-record client index
data/tools_expanded*.json       # separate 199-record AI-model dataset
data/category_editorial.json    # editorial + SEO copy (30 categories)
data/blog-posts.ts              # 18 posts
data/stacks.ts                  # 5 curated stacks
data/guides.ts                  # 10 how-to guides
data/seo.ts                     # VS-pair generation helpers
data/memory*.json               # Sentinel agent memory (per-repo audit trail)
data/cortex-memory.json         # agent episodes, strategies, failure patterns
data/bundled-docker-templates*.json  # 143 templates keyed by tool slug
docker-deploy/<slug>/           # 143 Compose configs; 68 with install.sh
deployments/<slug>/             # generated bundles for the 68 installer-ready tools
docs/                           # Nextra docs source (run locally; see below)
scraper/                        # Python metadata scraper
scripts/                        # GitHub metadata fetch helper
assets/logos/                   # 59 tool logos (third-party trademarks)
.github/                        # issue templates, PR template, workflows
```

The docs site is source-only in this repository. Run it locally:

```bash
cd docs
npm install
npm run dev   # http://localhost:3001
```

## How it is maintained

Five GitHub Actions workflows keep the repository moving:

| Workflow | What it does | Trigger |
| --- | --- | --- |
| `validate-data.yml` | Checks that every JSON file under `data/` parses (`jq empty`) | Push/PR touching `data/**/*.json` |
| `scrape-data.yml` | Refreshes upstream stars, language, license, and last commit; opens a PR on `chore/nightly-enrichment` | Daily at 00:00 UTC |
| `sync-to-main-app.yml` | Mirrors `data/` and `docker-deploy/` to the AltStack application repository after a guard | Push to `main` touching those paths |
| `check-docs.yml` | Builds the Nextra docs | PR touching `docs/**` |
| `redeploy-site.yml` | Calls a Vercel deploy hook when the secret is configured | Push to `main` touching `data/**` or `deployments/**` |

The Sentinel pipeline's per-repo memory and audit trail live in [`data/memory.json`](data/memory.json), [`data/memory-min.json`](data/memory-min.json), and [`data/cortex-memory.json`](data/cortex-memory.json).

Automation has damaged this dataset before. In September and October 2026, two sync incidents deleted community contributions; every affected entry was restored, and the causes and safeguards are documented in [INCIDENTS.md](INCIDENTS.md). Pull requests in this repository are now the authoritative way to change the catalog.

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

## Contributors and thanks

The catalog is one maintainer plus everyone who sent a fix. The repository is maintained by [Aditya](https://github.com/aa-humaaan); the changes below belong to the people named.

Four contributors sent more than one change: [Braedon Saunders](https://github.com/braedonsaunders), [Mike Cecconello](https://github.com/mikececco), [Vlad Nadymov](https://github.com/nadyyym), [Benjamin Wagner](https://github.com/benjiwagner).

Single-fix contributors: [shashank agarwal](https://github.com/imshashank), [Mohammed Ali Chherawalla](https://github.com/alichherawalla), [Sridhar Bala](https://github.com/sridharkalaibala), [Sanja Malovic](https://github.com/unjica), [QY](https://github.com/1146345502), [@PrinceAdvant](https://github.com/PrinceAdvant), [Mehmet Cevheri BOZOGLAN](https://github.com/cevheri), [Jesus Paz](https://github.com/JesusPaz), [Edvaldo Freitas](https://github.com/edvaldofreitas), [Dudka](https://github.com/sosidudku1), [@BlueSkyID666](https://github.com/BlueSkyID666), [Ayush Agarwal](https://github.com/aagarwal1012), [Arsalan](https://github.com/arsalann).

Several of these contributions were deleted — twice — by the synchronization incidents documented in [INCIDENTS.md](INCIDENTS.md), and restored by hand. Nobody who sent a fix after the first wipe owed this repository a second one. Thank you for sending it anyway.

Automation is credited as pipeline, not authorship: nightly metadata refreshes run under `github-actions[bot]` (the Sentinel pipeline) and appear in the commit history without being counted above. Separately, thanks to the maintainers of the 114 open-source projects catalogued here — this repository exists to point at their work. Land a fix and you belong in this list; add yourself in the same pull request if you like.

## License and attribution

The repository's [LICENSE](LICENSE) is the **Apache License 2.0**. [CONTRIBUTING.md](CONTRIBUTING.md) separately states that data and documentation contributions are accepted under **CC BY 4.0**; the repository does not yet include a NOTICE reconciling the two. If you need a definitive answer for redistributing the data, open an issue before relying on either. Third-party names and logos remain the property of their respective projects.

## Explore

- [The AltStack](https://thealtstack.com) — the live directory
- [Documentation source](docs/) — Nextra site, run locally
- [Contributing guide](CONTRIBUTING.md) · [Tool criteria](CRITERIA.md) · [Incident register](INCIDENTS.md)
- [Issues](https://github.com/altstackHQ/altstack-data/issues) · [Contributors](https://github.com/altstackHQ/altstack-data/graphs/contributors)
- [Machine-readable docs index](docs/public/llms.txt) for agents and LLM tooling

The dataset is the source of truth. If something here is wrong, the fix belongs in a pull request.
