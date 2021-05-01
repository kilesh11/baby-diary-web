module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans:
                    '-apple-system, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            },
            colors: {
                primary: {
                    DEFAULT: '#788eec',
                    dark: '#5F75D3',
                    darkest: '#122886',
                    light: '#92A8FF',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
