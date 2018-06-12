/**
 * author: niuxiaoyu
 * description: 统一处理请求异常
 * date: 2018/6/6
 */
import { ACTION_TYPE_ADD_ERROR } from 'constants/constant';

const REMOVE_ERROR = 'app/REMOVE_ERROR';

const initialState = {
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPE_ADD_ERROR:
      return Object.assign({}, state, {
        error: action.payload.errorMsg
      });
    case REMOVE_ERROR:
      return Object.assign({}, state, {
        error: null
      });
    default:
      return state;
  }
}

export function removeError(planName) {
  return async dispatch => {
    dispatch({ type: REMOVE_ERROR });
  };
}

