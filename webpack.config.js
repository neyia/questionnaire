const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        highscores: './src/highscores.js',
        index: './src/index.js',
        game: './src/game.js',
        end: './src/end.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        open: true,
        port: 8081
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            }

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index'],
            inject: false,
        }),
        new HtmlWebpackPlugin({
            template: './src/end.html',
            filename: 'end.html',
            chunks: ['end'],
            inject: false,
        }),
        new HtmlWebpackPlugin({
            template: './src/game.html',
            filename: 'game.html',
            chunks: ['game'],
            inject: false,
        }),
        new HtmlWebpackPlugin({
            template: './src/highscores.html',
            filename: 'highscores.html',
            chunks: ['highscores'],
            inject: false,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ]
};