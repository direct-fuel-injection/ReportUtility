module.exports = {
    rootDir : '../',
    automock: false,
    setupFiles: ["./jest/setup.js"],
    transform: {
        '^.+\\.js$': './jest/transformer.js',
        "^.+\\.html?$": "html-loader-jest",
        '\\.css$': '../node_modules/jest-css-modules'
    },
    moduleNameMapper:{
        "\\.css$": "identity-obj-proxy"
    }
};