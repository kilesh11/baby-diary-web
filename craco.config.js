const path = require(`path`);

module.exports = {
    style: {
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@component': path.resolve(__dirname, 'src/component'),
            '@context': path.resolve(__dirname, 'src/context'),
            '@util': path.resolve(__dirname, 'src/util'),
            '@image': path.resolve(__dirname, 'src/image'),
        },
    },
};
