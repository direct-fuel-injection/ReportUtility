var HtmlWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/demo/index.html',
    inject: false,
    filename: 'index.html'
})

module.exports = {
    mode: 'development',
    context: __dirname + '/src',
    entry: './index.js',

    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    },

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-0']
                    }
                },
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[hash:base64:8]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [HTMLWebpackPluginConfig]
}