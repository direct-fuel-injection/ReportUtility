var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.config.js')
var path = require('path');

module.exports = merge(baseConfig, {
    mode: 'production',
    entry: './src/index',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../dist/without-react'),
        filename: 'report.utility.min.js'
    },

    externals : {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
});