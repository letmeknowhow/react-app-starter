/**
 *  Class: LoggerMiddleware
 *  Author: Niu Xiaoyu
 *  Date: 16/7/11.
 *  Description: 增加一层中间件,便于以后对action做统一处理
 */

export default function createLoggerMiddleware({dispatch, getState}) {
  return next => action => {
    //console.log('当前状态');
    //console.log(getState());
    //console.log('action');
    //console.log(action);
    return next(action);
  };
}
