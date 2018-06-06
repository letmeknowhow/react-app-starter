'use strict';

const Env = require('./env');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let env = Env.env;
let unFePlugins = [
    // new BundleAnalyzerPlugin()   //bundle分析
];

module.exports = {
    common: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /^\.\/zh\-cn$/),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    production: unFePlugins.concat([
        //注入发布环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
	]),
    qa: unFePlugins,
    dev: unFePlugins,
	fe: [
		new webpack.HotModuleReplacementPlugin(),
    ]
};