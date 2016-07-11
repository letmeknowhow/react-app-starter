/**
 * production环境测试服务
 * @type {webpack|exports|module.exports}
 */

//const express = require('express');
//const bodyParser = require('body-parser');
//const request = require('request');
//const app = express();
//
//
////设置静态文件目录
//app.use(express.static(`${__dirname}/static`));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//  extended: false
//}));
//
////设置任意路由都返回html
//app.get('*', (req, res) => {
//  res.sendFile(`${__dirname}/index.html`);
//});
//
////创建服务器
//app.listen(3000, () => {
//  console.log('请在浏览器中打开：http://localhost:3000/');
//});

/**
 * development环境测试服务
 * @type {webpack|exports|module.exports}
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', (err, result) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Listening at http://localhost:3000/');
});