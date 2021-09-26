const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SveltePreprocess = require("svelte-preprocess");

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'ts', 'index.ts'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            svelte: path.resolve(__dirname, 'node_modules', 'svelte'),
        },
        extensions: ['.tsx', '.ts', '.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'html', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    }
                ],
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img',
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svelte$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'svelte-loader',
                        options: {
                            emitCss: true,
                            preprocess: SveltePreprocess({}),
                        },
                    },
                ],
            },
            {
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
};