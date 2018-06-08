
/**
 * author: niuxiaoyu
 * description: 新建单元
 * date: 2018/6/6
 */
import { ACTION_TYPE_ADD_ERROR } from 'common/constant';
import {
  GET_SKUSET_INFO_LIST
} from './skuunit';
import {
  createNewOneApi
} from 'api/skuunit';
const INIT_STATE = 'newSkuunit/INIT_STATE';
const OPEN_DRAWER = 'newSkuunit/OPEN_DRAWER';
const CREATE_NEW = 'newSkuunit/CREATE_NEW';
const CREATE_NEW_START = 'newSkuunit/CREATE_NEW_START';

const initialState = {
  skusetList: [],
  drawerIsOpening: false,
  submitting: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT_STATE:
      return Object.assign({}, state,
        initialState
      );
    case OPEN_DRAWER:
      return Object.assign({}, state, {
        drawerIsOpening: true,
      });
    case CREATE_NEW_START:
      return Object.assign({}, state, {
        submitting: true,
      });
    case CREATE_NEW:
      return Object.assign({}, state, _afterSubmit(action));
    case GET_SKUSET_INFO_LIST:
      return Object.assign({}, state, {
        skusetList: action.payload.data,
      });
    default:
      return state;
  }
}

const _afterSubmit = (action) => {
  let newState;
  if ((action.res && action.res.flag == '1')
    || (action.payload && action.payload.flag == '1')) {
    newState = {
      submitting: false
    };
  } else {
    newState = {
      skusetList: [],
      drawerIsOpening: false,
      submitting: false,
    };
  }
  return newState;
}

export function initNewSkuunit(planName) {
  return async dispatch => {
    try {
      dispatch({
        type: INIT_STATE
      });
    } catch (err) {
      console.log(err);
    }
  };
}

/**
 * 抽屉打开
 */
export function openDrawer() {
  return async dispatch => {
    dispatch({ type: OPEN_DRAWER });
  };
}

/**
 * 修改单元对应的集合
 */
export function createNewOne(p1, p2) {
  return async dispatch => {
    dispatch({ type: CREATE_NEW_START });
    try {
      const param = { p1, p2 };
      const res = await createNewOneApi(param);
      dispatch({ type: CREATE_NEW, res });
    } catch (err) {
      dispatch({ type: ACTION_TYPE_ADD_ERROR, payload: { errorMsg: err } });
    }
  };
}