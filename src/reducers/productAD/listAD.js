/**
 *  Class: listAD
 *  Author: Niu Xiaoyu
 *  Date: 16/7/14.
 *  Description: 广告列表
 */
import { AD_LIST_SUCCESS, AD_LIST_FAILURE, AD_LIST_LOADING } from '../../actions/actionTypes';
let initialState = {
  loadMsg: '正在加载中...',
  loadState: 2,  //0 正在加载中, 1加载失败，2加载成功
  title: '正在加载中...',
  list: []
};

export default (state = initialState, action) => {
  let nextstate;
  switch (action.type) {
    case AD_LIST_SUCCESS:
      nextstate = Object.assign({}, state, {list: action.payload, loadState: 2});
      return nextstate;
    case AD_LIST_FAILURE:
      nextstate = Object.assign({}, state, {loadState: 1});
      return nextstate;
    case AD_LIST_LOADING:
      nextstate = Object.assign({}, state, {loadState: 0});
      return nextstate;
    default:
      return state;
  }
};
