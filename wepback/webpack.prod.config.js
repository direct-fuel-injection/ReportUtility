const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.config.js')

module.exports = merge(baseConfig, {
    mode: 'production',
    entry: ['whatwg-fetch', './src/index'],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'report.utility.min.js',
        library: 'ReportUtility',
        libraryTarget: 'umd',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
})
