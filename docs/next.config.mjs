import nextra from 'nextra'

const withNextra = nextra({
    defaultShowCopyCode: true,
    search: {
        codeblocks: true,
    },
})

export default withNextra({
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
})



