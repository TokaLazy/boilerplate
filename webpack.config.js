const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        // port: 9000,
        // historyApiFallback: true,
        hot: true,
        overlay: true,
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'babel-loader',
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },

    output: {
        chunkFilename: '[name].[chunkhash].js',
        filename: '[name].[chunkhash].js',
    },

    mode: 'development',

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, './index.html'),
        }),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/,
                },
            },
            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true,
        },
    },
};
