# Tool Vetting Criteria

Every tool listed on The AltStack is manually reviewed against the criteria below before inclusion. This document exists for transparency — if a tool doesn't meet these standards, it won't be listed regardless of popularity.

## Inclusion Criteria

### 1. Active Maintenance
- Repository must have commits within the last 6 months
- Open issues should show maintainer engagement (not abandoned)
- Projects with a single commit or no release tags are excluded

### 2. Open Source License
- Must use a recognized open-source license (MIT, Apache 2.0, GPL, AGPL, MPL, BSD, etc.)
- "Source available" with restrictive licenses are listed but clearly marked
- Proprietary tools are only listed as the "replaced by" reference, never as alternatives

### 3. Self-Hostability
- Must be deployable on user-owned infrastructure
- Docker support is strongly preferred but not mandatory
- Clear installation documentation must exist
- Tools that require phoning home to a vendor service are flagged

### 4. Functional Replacement
- Must genuinely replace or substitute the proprietary tool it's listed against
- We test core workflows, not just feature checkbox parity
- A tool listed as a "Slack alternative" must actually handle team messaging, not just have a chat widget

### 5. Minimum Community Traction
- Not a hard star count threshold, but the project should show real-world usage
- Evidence includes: GitHub stars, active Discord/forum, third-party blog posts, or package download counts
- Solo hobby projects with no users are excluded

> **⚠️ Data drift warning.** The nightly metadata enrichment (`scrape-data.yml`) refreshes `stars`, `language`, `last_commit`, and also resets `tags` and `alternatives` to empty arrays. Records that previously had those fields populated can lose them after a refresh. If you need to preserve `tags` or `alternatives`, pin the record's values in a separate override file or add a safeguard to the workflow before the next run. This is the same failure mode that caused the sync incidents documented in [INCIDENTS.md](INCIDENTS.md).
- `data/tools.json` is the canonical source; always verify field values before relying on them for downstream consumers.

## Docker Deployment Configs

The 56+ tools with Docker Compose configurations have additional requirements:

- Config must produce a working deployment (we test every config)
- Environment variables for secrets must use placeholder values, not hardcoded defaults
- The "Generate Secure Config" feature on the site replaces placeholders with cryptographically random values
- Configs target single-server deployment (not Kubernetes)

## What We Don't Vet

- We don't audit source code for security vulnerabilities
- We don't benchmark performance claims
- We don't verify every feature listed on a tool's own marketing page
- We don't guarantee long-term project survival

## Reporting Issues

If a listed tool no longer meets these criteria (abandoned, license changed, etc.), open an issue:
https://github.com/altstackHQ/altstack-data/issues

## Changes to This Document

This criteria may evolve. Changes will be tracked through git history on this file.
