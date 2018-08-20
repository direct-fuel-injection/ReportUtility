var path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        init: './examples/init/src/index'
    },

    output: {
        path: path.resolve(__dirname, './examples'),
        publicPath: '/examples/',
        filename: '[name]/bundle.js'
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
    }
}