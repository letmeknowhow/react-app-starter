const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Env = require('./env');
const publicPath = require('./publicPath');
const resolve = Env.resolve;
const theme = require('../theme.js');

const bjreportLoader = {
  test: resolve('src/index.js'),
  loader: '@bizfe/biz-bjreport-loader' //resolve('loaders/biz-bjreport-loader.js'),
}

let common = {
  rules: [
    Object.assign({}, bjreportLoader, {
      options: {
        isProd: Env.isProductEnv,
        applyID: Env.isProductEnv ? 6 : 20
      }
    }),
    {
      test: /\.css/i,
      include: [
        resolve('src'),
      ],
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          
        }
      ]
    },
    {
      test: /\.less/i,
      include: [
        resolve('asset/css'),
        resolve('src'),
        resolve('node_modules/antd/'),
      ],
      use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            options: {
                minimize: true //css压缩
            }
        },
        {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: theme
            }
        }
      ]
    },
    {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: ['file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
    },
    {
      test: /\.(js|jsx)$/i,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      }
    }
  ]
};

module.exports = {
  common: common,
  production: {},
  qa: {},
  dev: {},
  fe: {}
};
