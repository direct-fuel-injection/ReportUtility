var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.config.js')
var path = require('path');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index',

    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist',
        filename: 'report.utility.js',
        library: 'ReportUtility',
        libraryTarget: 'umd'
    },

    devServer: {
        contentBase: [path.join(__dirname, '../examples'), path.join(__dirname, '../')],
        port: 3000
    }
});