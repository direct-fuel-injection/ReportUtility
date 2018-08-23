module.exports = {
    parser: false,
    plugins: {
        autoprefixer: {
            browsers: ['ie >= 11', 'last 4 versions'],
        },
        cssnano: {},
    },
}
