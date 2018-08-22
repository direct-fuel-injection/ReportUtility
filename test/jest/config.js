module.exports = {
    rootDir : '../',
    setupFiles: ['./jest/setup.js'],
    transform: {
        '^.+\\.js$': './jest/transformer.js',
        '\\.css$': '../node_modules/jest-css-modules'
    },
    moduleNameMapper:{
        "\\.css$": "identity-obj-proxy"
    }
};