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
import 'flex-css-layout';
import './css/style.less'; //css文件
import './iconfont/iconfont.css'; //字体图标文件

ReactDOM.render(
  <Provider store={store}>
    {route}
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);