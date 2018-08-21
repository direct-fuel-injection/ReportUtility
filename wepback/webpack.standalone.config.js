var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.config.js')
var path = require('path');

module.exports = merge(baseConfig, {
    mode: 'production',
    entry: './src/index',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../dist/standalone'),
        filename: 'report.utility.min.js',
        library: 'ReportUtility',
        libraryTarget: 'umd'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
});