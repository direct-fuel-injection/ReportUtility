const babelOptions = require('./babel.config.json')

module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: babelOptions,
            },
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: require.resolve('./postcss.config.js'),
                        },
                    },
                },
            ],
        },
        {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true,
                },
            }],
        },
        ],
    },
}
