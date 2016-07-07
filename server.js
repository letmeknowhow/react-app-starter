/**
 * production环境测试服务
 * @type {webpack|exports|module.exports}
 */
//var express = require('express');
//var bodyParser = require('body-parser');
//var request = require('request');
//var app = express();
//
//
////设置静态文件目录
//app.use(express.static(__dirname + '/static'))
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//    extended: false
//}));
//
////设置任意路由都返回html
//app.get('*', function (req, res) {
//    res.sendFile(__dirname + '/index.html')
//});
//
////创建服务器
//app.listen(3000, function () {
//    console.log('请在浏览器中打开：http://localhost:3000/')
//});

/**
 * development环境测试服务
 * @type {webpack|exports|module.exports}
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:3000/');
});