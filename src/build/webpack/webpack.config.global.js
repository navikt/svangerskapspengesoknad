const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfig = {
    entry: {
        bundle: ['@babel/polyfill', `${__dirname}/../../app/bootstrap.tsx`],
    },
    output: {
        path: path.resolve(__dirname, './../../../dist'),
        filename: 'js/[name].js',
        publicPath: '/dist',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        alias: {
            app: path.resolve(__dirname, './../../app'),
            common: path.resolve(__dirname, './../../common'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: [
                    path.resolve(__dirname, './../../app'),
                    path.resolve(__dirname, './../../common'),
                    path.resolve(__dirname, './../../storage'),
                ],
                loader: require.resolve('awesome-typescript-loader'),
            },
            {
                enforce: 'pre',
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    cache: true,
                },
            },
            {
                test: /\.js$/,
                use: [{ loader: 'babel-loader' }],
                exclude: /node_modules/,
            },
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb|nn|en/),
    ],
};

module.exports = webpackConfig;
