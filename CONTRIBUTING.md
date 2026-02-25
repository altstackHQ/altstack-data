# Contributing to The Alt Stack Data & Docs 🥞

Thank you for your interest in contributing! Our community helps maintain the accuracy and quality of our open source data and documentation.

## Types of Contributions

1. **New Tools:** Adding an alternative to our dataset.
2. **Data Fixes:** Correcting URLs, pricing, descriptions, or pros/cons.
3. **Deployment Guides:** Writing or updating guides in `docs/app/deploy/`.

## 1. Modifying Data (`/data/`)

Our core data is stored in `data/tools.json`.

1. Find the parent SaaS tool (e.g., "Slack") in the JSON structure.
2. Add or modify the alternative under the `alternatives` array.
3. Ensure you follow the structure defined in `data/schema/types.ts`.
4. Run validation (if applicable locally) before committing.

## 2. Modifying Documentation (`/docs/`)

Our documentation is built with Next.js and Nextra. All pages are under `docs/app/`.

1. Navigate to the appropriate folder (e.g., `docs/app/deploy` for guides).
2. Create or edit the `.mdx` file.
3. If creating a new page, make sure to add it to the adjacent `_meta.ts` file so it appears in the sidebar!

## Pull Request Process

1. Fork the repository and create your feature branch: `git checkout -b fix/name-of-tool-data`
2. Make your targeted changes. **Keep PRs small** (e.g., fix one tool, don't change 50 things at once).
3. Commit your changes with a descriptive message: `fix(data): update RocketChat pricing link`
4. Open a Pull Request against our `main` branch.
5. A maintainer will review your PR. We may request changes or ask clarifying questions.

By contributing to this repository, you agree that your data and documentation contributions will be licensed under the CC BY 4.0 license.
