/*
  项目入口
*/
import '../asset/css/app.less';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { message, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import confirm from 'component/Modal/confirm';
import store from './store/index';
import Root from './routers';

window.alert = (msg, type) => {
  if (type === 'success') {
    message.success(msg, 4);
  } else if (type === 'error') {
    message.error(msg, 4);
  } else {
    message.warning(msg, 4);
  }
};

window.confirm = (msg, onOk, onCancel) => {
  confirm({
    title: msg,
    onOk() {
      onOk && onOk();
    },
    onCancel() {
      onCancel && onCancel();
    }
  });
};

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <HashRouter>
        <Root />
      </HashRouter>
    </LocaleProvider>
  </Provider>,
  document.getElementById('app')
);
