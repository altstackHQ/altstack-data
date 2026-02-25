import type { MetaRecord } from 'nextra'

const meta: MetaRecord = {
    index: {
        title: 'Home',
        type: 'page',
        display: 'hidden',
    },
    why: {
        title: '📜 Why These Docs Exist',
    },
    'quick-start': {
        title: '🚀 Quick Start',
    },
    deploy: {
        title: '📦 Deploy Guides',
    },
    stacks: {
        title: '🔥 Stacks',
    },
    concepts: {
        title: '🧠 Concepts',
    },
    // -- External links --
    directory: {
        title: '← Back to Directory',
        href: 'https://thealtstack.com',
        type: 'page',
    },
    contact: {
        title: 'Contact Us',
        display: 'hidden'
    },
}

export default meta
