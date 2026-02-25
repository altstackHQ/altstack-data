'use client'

import { usePathname } from 'next/navigation'

export default function AIChatLinks() {
    const pathname = usePathname()
    const currentUrl = `https://docs.thealtstack.com${pathname === '/' ? '' : pathname}`

    const prompt = `Read the documentation at ${currentUrl} and use the context from https://docs.thealtstack.com/llms.txt to help me understand or address my problem regarding this page.`
    const encodedPrompt = encodeURIComponent(prompt)

    const chatGptUrl = `https://chatgpt.com/?q=${encodedPrompt}&hints=search`
    const claudeUrl = `https://claude.ai/new?q=${encodedPrompt}`

    return (
        <div className="flex items-center gap-2 md:gap-3 ml-2 border-l border-black/10 dark:border-white/10 pl-3 md:pl-4 py-1">
            <a
                href={chatGptUrl}
                target="_blank"
                rel="noreferrer"
                title="Ask ChatGPT about this page"
                className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-full transition-all"
            >
                <span className="w-3 h-3 rounded-full bg-[#10A37F] shrink-0 shadow-[0_0_8px_rgba(16,163,127,0.4)]" />
                <span className="hidden sm:inline">ChatGPT</span>
            </a>
            <a
                href={claudeUrl}
                target="_blank"
                rel="noreferrer"
                title="Ask Claude about this page"
                className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 text-sm font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 dark:text-amber-100 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 rounded-full transition-all"
            >
                <span className="w-3 h-3 rounded-full bg-[#D97757] shrink-0 shadow-[0_0_8px_rgba(217,119,87,0.4)]" />
                <span className="hidden sm:inline">Claude</span>
            </a>
        </div>
    )
}
