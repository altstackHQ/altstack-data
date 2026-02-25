import { Stack } from '../app/types';

export const STACKS: Stack[] = [
    {
        id: 'bootstrapper',
        name: 'The Bootstrapper Stack',
        emoji: '🚀',
        tagline: 'Launch for $0/mo',
        description: 'Everything you need to build, ship, and manage a SaaS product without spending a dime on software. Perfect for solo founders and early-stage startups.',
        monthlySaved: 310,
        tools: [
            { category: 'Database & Auth', toolSlug: 'supabase' },
            { category: 'Project Mgmt', toolSlug: 'plane' },
            { category: 'Communication', toolSlug: 'rocketchat' },
            { category: 'Deployment', toolSlug: 'coolify' },
            { category: 'Analytics', toolSlug: 'plausible' },
            { category: 'Design', toolSlug: 'penpot' }
        ],
        seo_title: 'The Bootstrapper Stack - Build SaaS for Free',
        seo_description: 'The ultimate open-source stack for solo founders. Database, Auth, DevOps, and Design tools that cost $0/mo.'
    },
    {
        id: 'designer',
        name: 'The Designer Stack',
        emoji: '🎨',
        tagline: 'Ditch Creative Cloud',
        description: 'Professional design tools that rival Adobe. From UI/UX prototyping to photo editing and digital art — all open source, all free.',
        monthlySaved: 110,
        tools: [
            { category: 'UI/UX Design', toolSlug: 'penpot' },
            { category: 'Photo Editing', toolSlug: 'gimp' },
            { category: 'Digital Art', toolSlug: 'krita' },
            { category: 'Knowledge Base', toolSlug: 'appflowy' }
        ],
        seo_title: 'Open Source Design Stack - Adobe Alternatives',
        seo_description: 'Free, professional design tools to replace Adobe Creative Cloud. Penpot, GIMP, Krita, and more.'
    },
    {
        id: 'ai-first',
        name: 'The AI-First Stack',
        emoji: '🤖',
        tagline: 'Own your AI',
        description: 'Run powerful AI locally. No API keys, no usage limits, no data leaving your machine. LLMs, image generation, and code completion — all self-hosted.',
        monthlySaved: 69,
        tools: [
            { category: 'LLM Inference', toolSlug: 'llama' },
            { category: 'Coding Model', toolSlug: 'deepseek' },
            { category: 'Image Generation', toolSlug: 'stable-diffusion' },
            { category: 'IDE Assistant', toolSlug: 'continue-dev' },
            { category: 'Autocomplete', toolSlug: 'tabby' }
        ],
        seo_title: 'Local AI Stack - Self-Hosted LLMs & Tools',
        seo_description: 'Run AI locally with this curated stack. Llama 3, Stable Diffusion, and coding assistants that respect your privacy.'
    },
    {
        id: 'devops',
        name: 'The DevOps Stack',
        emoji: '⚙️',
        tagline: 'Self-host everything',
        description: 'From backend to hosting to monitoring — deploy and manage your entire infrastructure on your own terms. Zero vendor lock-in.',
        monthlySaved: 375,
        tools: [
            { category: 'Backend as a Service', toolSlug: 'supabase' },
            { category: 'PaaS (Vercel Alt)', toolSlug: 'coolify' },
            { category: 'Git Deployment', toolSlug: 'dokku' },
            { category: 'Web Analytics', toolSlug: 'plausible' },
            { category: 'Product Analytics', toolSlug: 'posthog' }
        ],
        seo_title: 'Open Source DevOps Stack - Self-Hosted PaaS',
        seo_description: 'Deploy like a pro with tools like Coolify, Dokku, and Supabase. The ultimate self-hosted infrastructure stack.'
    },
    {
        id: 'privacy',
        name: 'The Privacy Stack',
        emoji: '🔒',
        tagline: 'Zero data leaks',
        description: 'Every tool runs on your infrastructure. Your data never touches a third-party server. For teams and individuals who take privacy seriously.',
        monthlySaved: 185,
        tools: [
            { category: 'Password Manager', toolSlug: 'bitwarden' },
            { category: 'Team Chat', toolSlug: 'mattermost' },
            { category: 'Video Calls', toolSlug: 'jitsi' },
            { category: 'Analytics', toolSlug: 'matomo' },
            { category: 'Notes & Docs', toolSlug: 'appflowy' },
            { category: 'Knowledge Base', toolSlug: 'affine' }
        ],
        seo_title: 'Privacy-First Software Stack - Secure Alternatives',
        seo_description: 'A 100% self-hostable stack for maximum privacy. Bitwarden, Mattermost, Jitsi, and more.'
    }
];
