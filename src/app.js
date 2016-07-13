/**
 *  Class: app
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 项目入口
 */
require('babel-core/register');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import route from './config/route';
import store from './store/configureStore';
import './css/resets.less'; //重置浏览器默认样式
// import './css/data-flex.min.css'; //css布局文件
import 'flex-css-layout';
import './css/style.less'; //css文件
import './iconfont/iconfont.css'; //字体图标文件

//为Date函数增加Format方法
Date.prototype.Format = function (fmt) {
  let res = '';
  const o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
  };
  if (/(y+)/.test(fmt)) {
    res = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(res)) {
      res = res.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return res;
};

ReactDOM.render(
  <Provider store={store}>
    {route}
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);