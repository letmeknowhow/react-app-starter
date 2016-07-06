var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');

module.exports = {
  entry: {
    app: './src/app'
  },
  output: {
    path: './static/build',
    filename: 'app.js',
    publicPath: '/build/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /^node_modules$/,
        loader: 'babel?presets=es2015'
      }, {
        test: /\.css$/,
        exclude: /^node_modules$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
      }, {
        test: /\.less/,
        exclude: /^node_modules$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
      }, {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        exclude: /^node_modules$/,
        loader: 'file-loader?name=[name].[ext]'
      }, {
        test: /\.(png|jpg)$/,
        exclude: /^node_modules$/,
        loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
      }, {
        test: /\.jsx$/,
        exclude: /^node_modules$/,
        loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ExtractTextPlugin('app.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'], //后缀名自动补全
  }
};