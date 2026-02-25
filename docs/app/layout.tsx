import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import Link from 'next/link'
import Script from 'next/script'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import 'nextra-theme-docs/style.css'
import './globals.css'

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://docs.thealtstack.com'),
    title: {
        default: 'AltStack Docs — Self-Hosting Guides & Deploy Recipes',
        template: '%s — AltStack Docs',
    },
    description:
        'Step-by-step guides to self-host open source software. Docker Compose configs, deployment recipes, and stack-building guides for developers and teams.',
    openGraph: {
        title: 'AltStack Docs',
        description:
            'Self-hosting guides, deploy configs, and stack-building recipes for open source software.',
        url: 'https://docs.thealtstack.com',
        siteName: 'AltStack Docs',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AltStack Docs',
        description:
            'Self-hosting guides, deploy configs, and stack recipes.',
    },
}

export const viewport: Viewport = {
    themeColor: '#050505',
}

import AIChatLinks from '../components/AIChatLinks'

function Logo() {
    return (
        <div className="group/logo flex items-center gap-2 md:gap-3">
            <div className="relative w-7 h-7 md:w-10 md:h-10 flex items-center justify-center">
                <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="overflow-visible w-full h-full"
                >
                    {/* Bottom Layer (Slate) */}
                    <g className="animate-float-slate transition-transform duration-700 ease-out group-hover/logo:-translate-y-2">
                        <path
                            d="M20 32L8 26L20 20L32 26L20 32Z"
                            className="fill-slate-900/10 dark:!fill-white/10 manual-logo-fill"
                        />
                        <path
                            d="M20 32L8 26L20 20L32 26L20 32Z"
                            className="stroke-slate-900/20 dark:!stroke-white/20 manual-logo-stroke"
                            strokeWidth="1"
                        />
                    </g>

                    {/* Middle Layer (Glass) */}
                    <g className="animate-float-glass transition-transform duration-700 ease-out group-hover/logo:-translate-y-4">
                        <path
                            d="M20 26L8 20L20 14L32 20L20 26Z"
                            className="fill-slate-900/20 dark:!fill-white/20 manual-logo-fill-secondary"
                        />
                        <path
                            d="M20 26L8 20L20 14L32 20L20 26Z"
                            className="stroke-slate-900/30 dark:!stroke-white/30 manual-logo-stroke-secondary"
                            strokeWidth="1"
                        />
                    </g>

                    {/* Top Layer (Red) */}
                    <g className="animate-float-red transition-transform duration-700 ease-out group-hover/logo:-translate-y-6">
                        <defs>
                            <linearGradient id="logo-red-grad" x1="8" y1="14" x2="32" y2="14" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#EF4444" />
                                <stop offset="1" stopColor="#F97316" />
                            </linearGradient>
                            <filter id="logo-red-glow" x="0" y="0" width="40" height="40">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <path
                            d="M20 20L8 14L20 8L32 14L20 20Z"
                            fill="url(#logo-red-grad)"
                            filter="url(#logo-red-glow)"
                        />
                        <path
                            d="M20 20L8 14L20 8L32 14L20 20Z"
                            className="stroke-slate-900/40 dark:!stroke-white/40 manual-logo-stroke-tertiary"
                            strokeWidth="0.5"
                        />
                    </g>
                </svg>
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tighter text-slate-900 dark:!text-white transition-colors manual-logo-text">
                Alt<span className="text-red-500">Stack</span><span className="opacity-50 font-medium text-base ml-1 hidden sm:inline">docs</span>
            </span>
        </div>
    )
}

const navbar = (
    <Navbar
        logo={<Logo />}
    >
        <AIChatLinks />
    </Navbar>
)

const footer = (
    <Footer>
        <div className="w-full pt-16 pb-12 mt-24 border-t border-black/5 dark:border-white/5 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Logo />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 max-w-xs transition-colors">
                            Step-by-step guides to self-host open source software with real configs and zero filler.
                        </p>
                        <div className="flex items-center gap-4 text-slate-400">
                            <a href="https://thealtstack.com" className="hover:text-slate-900 dark:hover:text-white transition-colors text-sm">
                                thealtstack.com →
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="footer-header font-bold text-xs mb-6 uppercase tracking-widest transition-colors">Documentation</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/quick-start/what-is-self-hosting" className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">Quick Start</Link></li>
                            <li><Link href="/deploy" className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">Deploy Guides</Link></li>
                            <li><Link href="/stacks" className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">Curated Stacks</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer-header font-bold text-xs mb-6 uppercase tracking-widest transition-colors">About</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/why" className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">Why These Docs Exist</Link></li>
                            <li><a href="https://thealtstack.com/about" className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">About AltStack</a></li>
                            <li><a href="mailto:hello@thealtstack.com" className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">Send Feedback</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer-header font-bold text-xs mb-6 uppercase tracking-widest transition-colors">Support</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/contact" className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">Contact Us</Link></li>
                            <li><a href="https://thealtstack.com/privacy" className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">Privacy</a></li>
                            <li><a href="https://thealtstack.com/terms" className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-medium text-slate-500 dark:text-slate-600 uppercase tracking-widest transition-colors">
                        &copy; {new Date().getFullYear()} The AltStack. Empowering through Open Source.
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Systems Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Footer>
)

export default async function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <html lang="en" dir="ltr" suppressHydrationWarning>
            <Head
                color={{
                    hue: 10,
                    saturation: 80,
                    lightness: {
                        dark: 55,
                        light: 50,
                    },
                }}
            />
            <body
                className={`${outfit.variable} ${jetbrainsMono.variable}`}
            >
                {/* Google Analytics */}
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-MZR8ZCF535" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-MZR8ZCF535');
                    `}
                </Script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@graph': [
                                {
                                    '@type': 'WebSite',
                                    '@id': 'https://docs.thealtstack.com/#website',
                                    url: 'https://docs.thealtstack.com',
                                    name: 'AltStack Docs',
                                    description:
                                        'Step-by-step guides to self-host open source software. Docker Compose configs, deployment recipes, and stack-building guides.',
                                    publisher: {
                                        '@id': 'https://thealtstack.com/#organization',
                                    },
                                    potentialAction: {
                                        '@type': 'SearchAction',
                                        target: {
                                            '@type': 'EntryPoint',
                                            urlTemplate:
                                                'https://docs.thealtstack.com/?q={search_term_string}',
                                        },
                                        'query-input': 'required name=search_term_string',
                                    },
                                    inLanguage: 'en-US',
                                },
                                {
                                    '@type': 'Organization',
                                    '@id': 'https://thealtstack.com/#organization',
                                    name: 'AltStack',
                                    url: 'https://thealtstack.com',
                                    description:
                                        "The World's First Sovereign Infrastructure Engine. A curated directory of 400+ open source alternatives.",
                                    sameAs: ['https://docs.thealtstack.com'],
                                },
                                {
                                    '@type': 'BreadcrumbList',
                                    '@id': 'https://docs.thealtstack.com/#breadcrumb',
                                    itemListElement: [
                                        {
                                            '@type': 'ListItem',
                                            position: 1,
                                            name: 'AltStack',
                                            item: 'https://thealtstack.com',
                                        },
                                        {
                                            '@type': 'ListItem',
                                            position: 2,
                                            name: 'Docs',
                                            item: 'https://docs.thealtstack.com',
                                        },
                                    ],
                                },
                            ],
                        }),
                    }}
                />
                <Layout
                    navbar={navbar}
                    footer={footer}
                    pageMap={await getPageMap()}
                    editLink={null}
                    feedback={{ content: null }}
                >
                    {children}
                </Layout>
            </body>
        </html>
    )
}
