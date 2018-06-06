/**
 * author: niuxiaoyu
 * description: 统一处理请求异常
 * date: 2018/6/6
 */
import { ACTION_TYPE_ADD_ERROR } from 'common/constant';

export default ({ dispatch, getState }) => next => action => {
  if(action.res && action.res.flag == '1'){
    dispatch({ type: ACTION_TYPE_ADD_ERROR, payload: { errorMsg: action.res.msg[0] } });
    return;
  }
  
  if(action.payload && action.payload.flag == '1'){
    dispatch({ type: ACTION_TYPE_ADD_ERROR, payload: { errorMsg: action.payload.msg[0] } });
    return;
  }
  return next(action);
};