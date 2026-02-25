export interface DeploymentConfig {
    image: string;
    port: number;
    env?: { key: string; value: string }[];
    volumes?: string[];
    command?: string;
    local_path?: string;
    type?: 'docker-compose' | 'dockerfile';
}

export interface Tool {
    slug: string;
    name: string;
    category: string;
    is_open_source: boolean;
    description: string;
    website: string;
    github_repo?: string;
    stars?: number;
    description_long?: string;
    pros?: string[];
    cons?: string[];
    min_cost?: number;
    avg_monthly_cost?: number; // Estimated self-hosting or SaaS cost
    pricing_model?: 'Free' | 'Freemium' | 'Paid' | 'Paid (Subscription)' | 'Paid (One-time)';
    has_free_trial?: boolean;
    self_hostable?: boolean;
    license?: string;
    language?: string;
    tags?: string[];
    alternatives?: string[];
    last_commit?: string;
    logo_url?: string;
    affiliate_url?: string;
    referral_url?: string; // New field for specific referral links
    deployment?: DeploymentConfig;
    hardware_req?: string; // e.g., "16GB VRAM", "CPU only", "Cloud API"
    hosting_type?: 'cloud' | 'self-hosted' | 'both'; // How the tool/model is accessed

    ai_metadata?: {
        vram_inference_gb?: number; // Recommended VRAM for inference (FP16/BF16)
        context_window_tokens?: number; // Max sequence length
        parameters_total_b?: number; // Billion parameters
        parameters_active_b?: number; // For MoE models
        is_multimodal?: boolean;
    };
}

export interface Stack {
    id: string;
    name: string;
    emoji: string;
    tagline: string;
    description: string;
    monthlySaved: number;

    // Ordered list of tools with specific roles in this stack
    tools: {
        category: string; // e.g. "The Database", "Authentication"
        toolSlug: string;
    }[];

    // SEO
    seo_title?: string;
    seo_description?: string;
}
