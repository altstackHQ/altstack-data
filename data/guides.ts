// Migration guides (plan.md T3.4) — content lives here, names/costs resolve
// from data/tools.json at render time so numbers never drift from the data.
export interface GuideStep {
    title: string;
    body: string;
    code?: { label: string; content: string };
}

export interface Guide {
    slug: string;
    fromSlug: string; // paid tool slug in tools.json
    toSlug: string; // open-source tool slug in tools.json
    difficulty: 'Easy' | 'Medium' | 'Advanced';
    timeEstimate: string;
    tagline: string;
    why: string[];
    steps: GuideStep[];
    gotchas: string[];
    verify: string[];
}

export const GUIDES: Guide[] = [
    {
        slug: 'slack-to-mattermost',
        fromSlug: 'slack',
        toSlug: 'mattermost',
        difficulty: 'Easy',
        timeEstimate: '45 minutes',
        tagline: 'Same channels, threads and integrations — on your own server.',
        why: [
            'Slack Business+ costs $12.50/user/month — for a 20-person team that is $3,000/year of rent.',
            'Message history limits disappear: Mattermost keeps unlimited history on your hardware.',
            'Compliance and data residency become a config setting, not a sales call.',
        ],
        steps: [
            {
                title: 'Deploy Mattermost',
                body: 'Grab the production compose from the AltStack and bring it up. PostgreSQL is included — no external database needed.',
                code: {
                    label: 'bash',
                    content: 'mkdir mattermost && cd mattermost\ncurl -O https://raw.githubusercontent.com/aa-humaaan/thealtstack/main/docker-deploy/mattermost/docker-compose.yml\ndocker compose up -d',
                },
            },
            {
                title: 'Walk the team through accounts',
                body: 'Enable open sign-up for your email domain, or create accounts in bulk from the System Console. Teams map 1:1 to Slack workspaces; channels import as public/private channels.',
            },
            {
                title: 'Recreate your channel structure',
                body: 'Mattermost supports channels, private channels, group messages and threads. Rename your Slack channels the same way — the layout will feel instantly familiar to the team.',
            },
            {
                title: 'Reconnect the integrations that matter',
                body: 'Webhooks in Slack are Incoming/Outgoing — Mattermost has the same, plus a slash-command framework. Most CI bots (GitHub, GitLab, Jenkins) have first-class Mattermost plugins.',
            },
            {
                title: 'Move the archive (optional)',
                body: 'Slack admin exports (Discovery or standard export) can be imported via the mmetl tool. Most teams skip this and keep Slack read-only as an archive — it cancels the migration risk.',
            },
        ],
        gotchas: [
            'Email notifications feel different until users tune their notification settings — set defaults in the System Console on day one.',
            'If you use Slack Connect with external companies, those shared channels have no equivalent — plan a bridge channel or keep one Slack free tier for partners.',
            'Playbooks/workflows built in Slack don\'t transfer — rebuild the two or three you actually use as Mattermost playbooks or webhooks.',
        ],
        verify: [
            'docker compose ps shows mattermost + postgres healthy',
            'A test message from a phone on mobile data reaches the channel (push notifications working)',
            'CI bot posts a build status to a channel',
        ],
    },
    {
        slug: 'notion-to-appflowy',
        fromSlug: 'notion',
        toSlug: 'appflowy',
        difficulty: 'Easy',
        timeEstimate: '30 minutes',
        tagline: 'Docs, wikis and project boards — open source, offline-first.',
        why: [
            'Notion Team is $10/user/month and your workspace is locked behind their export quality.',
            'AppFlowy is offline-first: the app works on a plane, your data is in a folder you control.',
            'Self-hosted AppFlowy Cloud gives you sync and sharing without a subscription.',
        ],
        steps: [
            {
                title: 'Pick your mode: local-first or self-hosted sync',
                body: 'AppFlowy works standalone with local folders from day one. For team sync, deploy AppFlowy Cloud (AppFlowy-Cloud compose in the AltStack) and point the clients at it.',
            },
            {
                title: 'Export from Notion',
                body: 'Notion → Settings → Export → Markdown & CSV, include subpages. Everything arrives as a zip of .md files with images in folders.',
            },
            {
                title: 'Import into AppFlowy',
                body: 'AppFlowy → Import → Markdown. Page trees and headings carry over; databases come in as grids from the CSV exports.',
            },
            {
                title: 'Rebuild the two databases you actually use',
                body: 'Notion databases with complex formulas rarely map 1:1. Rebuild the task board and the CRM — AppFlowy grids support select, date, and checkbox fields, which covers most real usage.',
            },
        ],
        gotchas: [
            'Nested database relations are the weakest import — recreate those manually.',
            'Notion-style blocks like embedded maps have no equivalent; the content degrades to a link.',
            'If the team lives in mobile, test the mobile app before switching — it is good but younger than the desktop app.',
        ],
        verify: [
            'A page with headings, lists and images imports and renders correctly',
            'Two devices sync through your self-hosted cloud (or local folder sync works)',
            'Sharing a read-only page link works from your domain',
        ],
    },
    {
        slug: 'jira-to-plane',
        fromSlug: 'jira',
        toSlug: 'plane',
        difficulty: 'Easy',
        timeEstimate: '1 hour',
        tagline: 'Issues, sprints and cycles without the per-seat meter running.',
        why: [
            'Jira Premium is $15/user/month with licensing complexity that needs a part-time admin.',
            'Plane gives you issues, cycles, modules and views with a UI developers actually enjoy.',
            'Self-hosting means unlimited users for the price of a small VPS.',
        ],
        steps: [
            {
                title: 'Deploy Plane',
                body: 'The AltStack compose includes Plane\'s web, API, worker and PostgreSQL stack. One command up.',
                code: {
                    label: 'bash',
                    content: 'mkdir plane && cd plane\ncurl -O https://raw.githubusercontent.com/aa-humaaan/thealtstack/main/docker-deploy/plane/docker-compose.yml\ndocker compose up -d',
                },
            },
            {
                title: 'Create the workspace and projects',
                body: 'Map Jira projects to Plane projects 1:1. Set up the same states (Backlog → Todo → In Progress → Done) so muscle memory survives the move.',
            },
            {
                title: 'Export issues from Jira',
                body: 'Jira → Issues → Search → Export CSV (all fields). Keep keys, summary, description, assignee, status, labels.',
            },
            {
                title: 'Bulk-import into Plane',
                body: 'Plane supports CSV issue import per project. Map columns in the import wizard; assignees match by email after invites go out.',
            },
            {
                title: 'Point CI at Plane',
                body: 'JetBrains/VS Code plugins and the API cover commit-linking. Replace Jira smart-commits with Plane issue IDs in branch names.',
            },
        ],
        gotchas: [
            'Jira Automation rules don\'t import — rebuild the top three (auto-assign, release notes, stale-bulk) as Plane automations or CI steps.',
            'Advanced Roadmaps have no direct equivalent; Planes cycles cover sprint planning for most teams.',
            'Attachment-heavy issues: run the Jira export with attachments and re-attach the critical ones manually.',
        ],
        verify: [
            'A CSV import round-trips 20 issues with statuses intact',
            'Cycle board drag-and-drop moves state',
            'A commit message referencing the issue ID shows on the issue',
        ],
    },
    {
        slug: 'figma-to-penpot',
        fromSlug: 'figma',
        toSlug: 'penpot',
        difficulty: 'Medium',
        timeEstimate: '2 hours',
        tagline: 'Design files that belong to the team, in an open format.',
        why: [
            'Figma Professional is $15/editor/month and the files live in their cloud in a closed format.',
            'Penpot is built on open web standards (SVG/CSS) — files are portable by design.',
            'Unlimited editors, unlimited files, self-hosted or hosted free.',
        ],
        steps: [
            {
                title: 'Deploy or sign up',
                body: 'Self-host Penpot with the AltStack compose, or use Penpot\'s hosted plan free. Self-hosting keeps design assets behind your VPN.',
            },
            {
                title: 'Export from Figma',
                body: 'Figma frames export as SVG/PNG. For structure, use the Penpot Figma import plugin or export frames per-page — component structure won\'t survive 1:1, so export the rendered truth.',
            },
            {
                title: 'Rebuild the design system first',
                body: 'Recreate colors, typography and core components as Penpot design tokens/components before touching product files. Everything downstream then inherits.',
            },
            {
                title: 'Hand off with real CSS',
                body: 'Penpot inspect output is production CSS/SVG because the tool speaks web natively — developers stop translating Figma-speak.',
            },
        ],
        gotchas: [
            'Auto-layout ≈ flexbox but not identical — complex responsive frames need a re-layout pass.',
            'Figma plugins (Stark, Tokens Studio) have Penpot equivalents but not all — audit your plugin list first.',
            'Prototype interactions are simpler in Penpot; complex flows may need simplification.',
        ],
        verify: [
            'A core component (button + input) renders pixel-close in both tools',
            'Developers can inspect and copy real CSS from Penpot',
            'Two designers edit the same file simultaneously without conflicts',
        ],
    },
    {
        slug: 'google-analytics-to-plausible',
        fromSlug: 'google-analytics',
        toSlug: 'plausible',
        difficulty: 'Easy',
        timeEstimate: '20 minutes',
        tagline: 'One script tag, no cookie banner, stats you can read.',
        why: [
            'GA4 enterprise tiers and the engineering cost of consent management add up — Plausible replaces the whole stack at a fraction of one.',
            'Plausible is cookie-free and GDPR-compliant by design: the cookie banner can come off your site today.',
            'Self-hosted Plausible on a small VPS handles millions of pageviews; the dashboard loads in one screen.',
        ],
        steps: [
            {
                title: 'Deploy Plausible CE',
                body: 'The AltStack compose ships Plausible with PostgreSQL + ClickHouse. Bring it up and point a subdomain (analytics.yourdomain.com) at it.',
                code: {
                    label: 'bash',
                    content: 'mkdir plausible && cd plausible\ncurl -O https://raw.githubusercontent.com/aa-humaaan/thealtstack/main/docker-deploy/plausible/docker-compose.yml\ndocker compose up -d',
                },
            },
            {
                title: 'Register your site, get the snippet',
                body: 'Plausible issues a one-line script tag. Add it to your layout — with the universal background of your site this is a single <script defer> tag, nothing else.',
            },
            {
                title: 'Define goals that matter',
                body: 'Rebuild your GA4 key events as Plausible goals: pageviews on /pricing, 404s, outbound clicks, and custom events from your app via plausible(\'Signup\').',
            },
            {
                title: 'Run both for two weeks, then cut GA',
                body: 'Numbers differ by design: Plausible counts unique visits without cookies and excludes bots aggressively. Compare trends, not absolute digits, then remove GA and the consent banner.',
            },
        ],
        gotchas: [
            'Bot-filtered totals look lower than GA4 — that is correct behavior, not data loss.',
            'User-level journeys across sessions don\'t exist (privacy trade). Use funnel goals instead.',
            'Self-hosted updates: pin a version and update monthly; ClickHouse upgrades deserve a backup first.',
        ],
        verify: [
            'Your own visit shows in the live dashboard in real time',
            'A custom goal fires from the app',
            'The cookie banner is removed and no consent error appears in the console',
        ],
    },
    {
        slug: 'zapier-to-n8n',
        fromSlug: 'zapier',
        toSlug: 'n8n',
        difficulty: 'Medium',
        timeEstimate: '2–3 hours',
        tagline: 'Your automations, as exported workflows you own forever.',
        why: [
            'Zapier bills per task — a busy team burns $20→$100+/month for what is a cron job and two webhooks.',
            'n8n workflows are JSON files: version-control them, self-host them, run unlimited tasks.',
            'Self-hosted n8n connects to anything with an API, including your own internal services.',
        ],
        steps: [
            {
                title: 'Deploy n8n',
                body: 'One container plus a volume for encrypted credentials. The AltStack compose persists everything under /home/node/.n8n.',
                code: {
                    label: 'bash',
                    content: 'mkdir n8n && cd n8n\ncurl -O https://raw.githubusercontent.com/aa-humaaan/thealtstack/main/docker-deploy/n8n/docker-compose.yml\ndocker compose up -d',
                },
            },
            {
                title: 'Inventory your Zaps',
                body: 'List each Zap: trigger, actions, task run-rate. Delete the ones that fired twice last quarter — migrate only what earns its place.',
            },
            {
                title: 'Rebuild the top five first',
                body: 'n8n nodes exist for Gmail, Slack, Sheets, Notion, Discord, HTTP and more. Rebuild the top five Zaps; you will learn the editor and can decide the fate of the long tail.',
            },
            {
                title: 'Move credentials into n8n\'s vault',
                body: 'Store OAuth tokens as n8n credentials — encrypted at rest with your N8N_ENCRYPTION_KEY, which lives only on your server.',
            },
            {
                title: 'Schedule and monitor',
                body: 'Cron triggers replace polling Zaps. Add an error workflow that pings a Mattermost channel — you get better failure alerting than Zapier\'s email.',
            },
        ],
        gotchas: [
            'Zapier\'s built-in app logic (filters, paths) maps to n8n IF/Switch nodes — expect a rebuild, not an import.',
            'Some SaaS APIs need custom header auth — the HTTP Request node covers it.',
            'n8n self-hosted updates monthly; pin and back up the volume before upgrading.',
        ],
        verify: [
            'A rebuilt workflow fires end-to-end on a test payload',
            'Error workflow alerts to your chat channel on a forced failure',
            'Task counter on your Zapier bill starts dropping',
        ],
    },
    {
        slug: 'firebase-to-supabase',
        fromSlug: 'firebase',
        toSlug: 'supabase',
        difficulty: 'Advanced',
        timeEstimate: '1–2 weeks',
        tagline: 'From NoSQL lock-in to a real Postgres you can query.',
        why: [
            'Firebase billing is opaque and scales steeply once you leave the free tier.',
            'Supabase is Postgres: SQL, joins, row-level security, and an exit path that is a pg_dump.',
            'Auth, storage, realtime and edge functions cover the Firebase feature set on open standards.',
        ],
        steps: [
            {
                title: 'Model your Firestore data as SQL',
                body: 'The hardest and most valuable step. Firestore collections become tables; nested arrays become JSONB or join tables. Design the schema before touching data.',
            },
            {
                title: 'Stand up Supabase',
                body: 'Start with Supabase Cloud or self-host the stack. Create the schema, then enable Row Level Security on every table — RLS replaces Firestore security rules.',
            },
            {
                title: 'Migrate auth',
                body: 'Export Firebase users (CLI: firebase auth:export users.json --format json), then import into Supabase via the admin API, preserving UUIDs where possible. Update password hashes if you can export them; otherwise schedule a reset flow.',
            },
            {
                title: 'Move the data',
                body: 'Firestore export → transform to CSV/JSON → Supabase import (CSV per table or the migration script pattern). Verify counts per collection against per-table counts.',
            },
            {
                title: 'Ship a dual-write window',
                body: 'Run both backends for one release cycle: new writes go to both, reads come from Supabase. Flip reads, then stop Firebase writes and export a final archive.',
            },
        ],
        gotchas: [
            'Firestore listeners become Supabase Realtime subscriptions — different semantics, test reconnection.',
            'Cloud Functions are not edge functions 1:1 — port triggers as database webhooks or Supabase Edge Functions.',
            'Storage security rules need an RLS-equivalent policy review on buckets.',
        ],
        verify: [
            'Row counts match Firestore collection counts exactly',
            'A user can sign in with their old credentials (or through the planned reset)',
            'RLS blocks a cross-tenant read attempt in testing',
        ],
    },
    {
        slug: 'datadog-to-signoz',
        fromSlug: 'datadog',
        toSlug: 'signoz',
        difficulty: 'Medium',
        timeEstimate: '4 hours',
        tagline: 'Metrics, traces and logs on OpenTelemetry — without per-host pricing.',
        why: [
            'Datadog Pro is $23/host/month and the bill grows with every container you run.',
            'SigNoz is built on OpenTelemetry + ClickHouse: vendor-neutral agents, one binary, your data.',
            'Same pain dashboard — infra metrics, APM traces, log search — at VPS cost.',
        ],
        steps: [
            {
                title: 'Deploy SigNoz',
                body: 'The compose brings SigNoz, ClickHouse and the OpenTelemetry collector. One host handles small-to-medium fleets.',
                code: {
                    label: 'bash',
                    content: 'mkdir signoz && cd signoz\ncurl -O https://raw.githubusercontent.com/aa-humaaan/thealtstack/main/docker-deploy/signoz/docker-compose.yml\ndocker compose up -d',
                },
            },
            {
                title: 'Point OpenTelemetry at it',
                body: 'If you already emit OTel, change the exporter endpoint. Coming from Datadog agents, swap to the OTel collector with the Datadog receiver during transition.',
            },
            {
                title: 'Rebuild your top five dashboards',
                body: 'Port the alerts that actually paged you: CPU/memory saturation, error-rate SLOs, queue depth. Everything else was dashboard theater.',
            },
            {
                title: 'Ship logs through the collector',
                body: 'Filelog or fluentbit receivers feed the same ClickHouse. Set retention (default 30 days) to size your disk.',
            },
        ],
        gotchas: [
            'Datadog-specific monitors (synthetics, RUM) need separate tooling — browser RUM exists in SigNoz but evaluate it separately.',
            'OTel collector memory needs a few hundred MB — size the host accordingly.',
            'ClickHouse loves RAM; give the box 8GB+ for comfortable queries.',
        ],
        verify: [
            'A test container\'s CPU shows in the infra dashboard',
            'A trace from your app renders with spans',
            'One paged alert fires on a synthetic CPU spike',
        ],
    },
    {
        slug: '1password-to-bitwarden',
        fromSlug: '1password',
        toSlug: 'bitwarden',
        difficulty: 'Easy',
        timeEstimate: '1 hour',
        tagline: 'Unlimited devices, self-hostable vault, importer that actually works.',
        why: [
            '1Password Families is $8/user-ish with device limits on lower tiers.',
            'Bitwarden is free for unlimited devices, has official self-hosting (Vaultwarden for small teams), and annual exports keep you exit-ready.',
            'Browser extension and mobile apps are mature — the team stops noticing the change within a week.',
        ],
        steps: [
            {
                title: 'Deploy Vaultwarden (small teams) or Bitwarden RS',
                body: 'Vaultwarden is a lightweight Rust server compatible with all Bitwarden clients — perfect under 50 users. Put it behind your reverse proxy with TLS.',
                code: {
                    label: 'bash',
                    content: 'mkdir vaultwarden && cd vaultwarden\ncurl -O https://raw.githubusercontent.com/aa-humaaan/thealtstack/main/docker-deploy/vaultwarden/docker-compose.yml\ndocker compose up -d',
                },
            },
            {
                title: 'Export from 1Password',
                body: '1Password → File → Export → All items → 1PUX/CSV per vault. Export each vault separately to preserve structure.',
            },
            {
                title: 'Import into Bitwarden',
                body: 'Web vault → Tools → Import data → format 1Password (1pux/ifm). Folders map to folders; attachments need a manual pass.',
            },
            {
                title: 'Roll out clients',
                body: 'Point the Bitwarden extensions/apps at your server URL, enable TOTP autofill, and turn on the emergency kit/export policy so the vault never becomes a new lock-in.',
            },
        ],
        gotchas: [
            'Passkeys and SSH agent support: Bitwarden has them, Vaultwarden tracks upstream with a lag — check before you rely on them.',
            '1Password Travel Mode has no equivalent; plan offline access via client cache instead.',
            'Set a backup cron of the vaultwarden data directory — a vault is the one database you always back up.',
        ],
        verify: [
            'A credential autofills in the browser from your server',
            'TOTP codes generate for a test entry',
            'A vault backup file exists outside the server',
        ],
    },
    {
        slug: 'intercom-to-chaskiq',
        fromSlug: 'intercom',
        toSlug: 'chaskiq',
        difficulty: 'Medium',
        timeEstimate: '3 hours',
        tagline: 'Customer messaging and live chat, self-hosted.',
        why: [
            'Intercom\'s pricing punishes success — $39/seat and more as contacts grow.',
            'Chaskiq covers chat widget, campaigns, onboarding tours and a webhooks API on your domain.',
            'Customer transcripts and contact data stay in your compliance boundary.',
        ],
        steps: [
            {
                title: 'Deploy Chaskiq',
                body: 'The compose includes the app, PostgreSQL, Redis and Sidekiq workers. Point chat.yourdomain.com at it.',
            },
            {
                title: 'Install the messenger widget',
                body: 'Chaskiq gives you a JS snippet like Intercom\'s — drop it in your layout, style the launcher, and map your app\'s user properties to Chaskiq segments.',
            },
            {
                title: 'Rebuild saved replies and tours',
                body: 'Canned responses, billing macros and the onboarding tour translate 1:1. Rebuild the top ten replies and the one onboarding flow that actually converts.',
            },
            {
                title: 'Import contacts',
                body: 'Export Intercom contacts (CSV) and import via Chaskiq\'s API or CSV. Segment by plan with your app\'s metadata instead of Intercom tags.',
            },
        ],
        gotchas: [
            'Intercom\'s Fin/AI bot has no bundled equivalent — wire an LLM webhook if you rely on it.',
            'Email campaigns in Intercom may need a proper sending domain (SPF/DKIM) on your Chaskiq SMTP.',
            'Historical conversation archives: export for compliance, don\'t attempt full migration.',
        ],
        verify: [
            'Widget loads on your production domain with your branding',
            'An operator replies from Chaskiq and the visitor receives it in real time',
            'A campaign sends through your SMTP to a test segment',
        ],
    },
];

export function getGuideBySlug(slug: string): Guide | undefined {
    return GUIDES.find((g) => g.slug === slug);
}
