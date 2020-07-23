const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/app.tsx",
    mode: "development",
    output: {
        path: path.join(__dirname, 'builds'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "awesome-typescript-loader",
            },
            // {
            //     enforce: "pre",
            //     test: /\.js$/,
            //     loader: "source-map-loader",
            // },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devtool: 'source-map'
};