/*
   创建一个构造store的函数，真正的store在入口文件中创造
*/

import { compose, createStore, applyMiddleware } from 'redux';
// 引入thunk 中间件，处理异步操作
import thunk from 'redux-thunk';
import errorProcessor from '../middleware/errorProcessor'

const middleware = [
  thunk,
  errorProcessor
];

if (process.env.NODE_ENV !== 'production') {
  const logger = require('../middleware/logger');
  middleware.push(logger.default);
}

// 判断当前浏览器是否安装了 REDUX_DEVTOOL 插件
const shouldCompose =
   process.env.NODE_ENV !== 'production' &&
   typeof window === 'object' &&
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = shouldCompose
   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify here name, actionsBlacklist, actionsCreators and other options
     })
   : compose;

/*
   调用 applyMiddleware ，使用 middleware 来增强 createStore
*/
const configureStore = composeEnhancers(applyMiddleware(...middleware))(createStore);

export default configureStore;
