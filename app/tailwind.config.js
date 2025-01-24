/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'glow-slow': 'glow 8s ease-in-out infinite',
                'glow-slower': 'glow 12s ease-in-out infinite',
            },
            keyframes: {
                glow: {
                    '0%, 100%': { opacity: '0.05' },
                    '50%': { opacity: '0.1' },
                },
            },
        },
    },
    plugins: [],
};
