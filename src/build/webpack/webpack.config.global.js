const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfig = {
    entry: {
        bundle: ['@babel/polyfill', `${__dirname}/../../app/bootstrap.tsx`]
    },
    output: {
        path: path.resolve(__dirname, './../../../dist'),
        filename: 'js/[name].js',
        publicPath: '/dist'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        alias: {
            app: path.resolve(__dirname, './../../app'),
            common: path.resolve(__dirname, './../../common')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: require.resolve('tslint-loader'),
                enforce: 'pre'
            },
            {
                test: /\.(ts|tsx)$/,
                include: [
                    path.resolve(__dirname, './../../app'),
                    path.resolve(__dirname, './../../common'),
                    path.resolve(__dirname, './../../storage')
                ],
                loader: require.resolve('awesome-typescript-loader')
            },

            {
                test: /\.js$/,
                use: [{ loader: 'babel-loader' }],
                exclude: /node_modules/
            },
            {
                test: /\.(less|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.svg$/,
                use: 'svg-sprite-loader'
            }
        ]
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?[hash]-[chunkhash]-[name]',
            disable: false,
            allChunks: true
        }),
        new SpriteLoaderPlugin({
            plainSprite: true
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb|nn|en/)
    ]
};

module.exports = webpackConfig;
