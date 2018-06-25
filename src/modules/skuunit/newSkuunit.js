
/**
 * author: niuxiaoyu
 * description: 新建单元
 * date: 2018/6/6
 */
import { ACTION_TYPE_ADD_ERROR } from 'constants/constant';
import {
  createNewOneApi,
  getSkuSetInfoListApi
} from 'api/skuunit';
const INIT_STATE = 'newSkuunit/INIT_STATE';
export const CREATE_NEW = 'newSkuunit/CREATE_NEW';
const CREATE_NEW_FAILED = 'newSkuunit/CREATE_NEW_FAILED';
const SUBMIT_START = 'newSkuunit/SUBMIT_START';
const GET_SKUSET_INFO_LIST = 'newSkuunit/GET_SKUSET_INFO_LIST';

const initialState = {
  skusetList: [],
  submitting: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT_STATE:
      return Object.assign({}, state,
        initialState
      );
    case SUBMIT_START:
      return Object.assign({}, state, {
        submitting: true,
      });
    case CREATE_NEW:
      return Object.assign({}, state, {
        skusetList: [],
        submitting: false,
      });
    case CREATE_NEW_FAILED:
      return Object.assign({}, state, {
        submitting: false
      });
    case GET_SKUSET_INFO_LIST:
      return Object.assign({}, state, {
        skusetList: action.payload.data,
      });
    default:
      return state;
  }
}

/**
 * 修改单元对应的集合
 */
export function createNewOne(p1, p2) {
  return async dispatch => {
    dispatch({ type: SUBMIT_START });
    try {
      const param = { p1, p2 };
      const res = await createNewOneApi(param);
      dispatch({ type: CREATE_NEW, res });
    } catch (err) {
      dispatch({ type: ACTION_TYPE_ADD_ERROR, payload: { errorMsg: err } });
    }
  };
}

/**
 * 单元列表查询展示
 * @param {*} params 
 */
export function getSkuSetInfoList() {
  return async dispatch => {
    try {
      const res = await getSkuSetInfoListApi();
      await dispatch({ type: GET_SKUSET_INFO_LIST, payload: res });
    } catch (err) {
      console.log(err);
    }
  };
}