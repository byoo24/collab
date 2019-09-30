const path = require('path');

module.exports = {
    context: __dirname,
    entry: './frontend/index.js',
    output: {
        path: path.resolve(__dirname, 'dist', 'js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.js?$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env', '@babel/react']
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '*']
    },
};