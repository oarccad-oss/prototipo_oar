/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#1E3A8A', // Blue 900
                    secondary: '#15803D', // Green 700
                },
                technical: {
                    bg: '#F8FAFC', // Slate 50
                },
                alert: {
                    fire: '#DC2626', // Red 600
                },
            },
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif'],
                serif: ['Merriweather', 'Playfair Display', 'serif'],
            },
        },
    },
    plugins: [],
}
