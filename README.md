# The Alt Stack Data & Docs 🥞

Welcome to the public repository for **The Alt Stack** context and data!

This repository contains:
1. **The Alt Stack Dataset** (`/data`): Our curated JSON data of open source alternatives to popular SaaS products.
2. **The Documentation Site** (`/docs`): The source code for [docs.thealtstack.com](https://docs.thealtstack.com) containing 60+ deployment guides, concepts, and more.

If you are looking for the main application (the UI, comparison engine, etc.), please note that the core application is closed-source. We open-source the data and documentation so the community can contribute to keeping the alternative software ecosystem accurate and well-documented.

## 🤝 Contributing

We welcome community contributions! This is the fastest way to get a new tool added or a deployment guide updated.

Before submitting a pull request, please read our [Contributing Guidelines](CONTRIBUTING.md).

### What you can contribute:
- **New Tools:** Submit an addition to `data/tools.json`.
- **Data Corrections:** Fix broken links, update pricing, or correct pros/cons.
- **Deployment Guides:** Write or update a self-hosting guide in `docs/app/deploy/`.
- **Typo Fixes:** Help us keep the documentation clean.

### What NOT to contribute here:
- Feature requests for the main application UI.
- Bug reports for the closed-source platform (use the contact form on the main site).

## 🗄️ Working with the Data

Our core dataset lives in `data/tools.json` and follows the TypeScript schema defined in `data/schema/types.ts`.

If you're building a project that references our data, you are welcome to consume it directly from this repository!

## 📄 License

This repository uses a dual-license model:
* **Documentation & Data** (`/docs/**/*.mdx`, `/data/**/*.json`): Creative Commons Attribution 4.0 International ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))
* **Scripts & Code** (`/scripts`, `.ts`/`.js` files): [Apache License 2.0](LICENSE)

*All tool logos in `assets/logos/` are the property of their respective trademark holders and are used for identification purposes only.*
