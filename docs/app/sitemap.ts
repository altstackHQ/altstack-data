import { MetadataRoute } from 'next'
import path from 'path'
import fs from 'fs'

const BASE_URL = 'https://docs.thealtstack.com'

/**
 * Dynamically generates the sitemap for the docs site by scanning
 * the app directory for all page.mdx files. This replaces the old
 * static public/sitemap.xml that would drift out of sync.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const appDir = path.join(process.cwd(), 'app')
    const pages: string[] = []

    // Recursively find all page.mdx files
    function scan(dir: string, prefix: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        for (const entry of entries) {
            // Skip hidden dirs, node_modules, test dirs
            if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'test') continue

            if (entry.isDirectory()) {
                scan(path.join(dir, entry.name), `${prefix}/${entry.name}`)
            } else if (entry.name === 'page.mdx') {
                // Root page.mdx → '/', nested → '/concepts/docker-basics'
                pages.push(prefix || '/')
            }
        }
    }

    scan(appDir, '')

    // Priority map for top-level sections
    const priorityMap: Record<string, number> = {
        '/': 1.0,
        '/quick-start': 0.9,
        '/deploy': 0.8,
        '/concepts': 0.8,
        '/stacks': 0.7,
    }

    return pages.map(pagePath => {
        // Determine priority based on section
        const section = '/' + (pagePath.split('/')[1] || '')
        const priority = priorityMap[section] || priorityMap[pagePath] || 0.6

        // Determine change frequency
        let changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly'
        if (pagePath === '/') changeFrequency = 'weekly'
        if (pagePath.startsWith('/deploy')) changeFrequency = 'weekly'

        return {
            url: `${BASE_URL}${pagePath}`,
            lastModified: new Date(),
            changeFrequency,
            priority,
        }
    })
}
