const path = require('path')


/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        path.join(__dirname, 'app/**/*.{js,jsx,ts,tsx,md,mdx}'),
        path.join(__dirname, 'content/**/*.{js,jsx,ts,tsx,md,mdx}'),
        path.join(__dirname, 'components/**/*.{js,jsx,ts,tsx,md,mdx}'),
        path.join(__dirname, 'mdx-components.tsx'),
        path.join(__dirname, 'node_modules/nextra-theme-docs/dist/**/*.{js,jsx,ts,tsx}'),
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    darkMode: 'class',
}
