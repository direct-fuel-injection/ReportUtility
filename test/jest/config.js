module.exports = {
    rootDir : '../',
    setupFiles: ['./jest/setup.js'],
    transform: {
        '^.+\\.js$': './jest/transformer.js',
        '\\.css$': '../node_modules/jest-css-modules'
    }
};