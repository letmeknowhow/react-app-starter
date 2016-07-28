/**
 *  Class: listAD
 *  Author: Niu Xiaoyu
 *  Date: 16/7/14.
 *  Description: 广告列表
 */
import { AD_LIST_LOADING, AD_LIST_SUCCESS, AD_LIST_FAILURE, AD_LIST_SETSCROLL } from '../../actions/actionTypes';
let initialState = {
  pageID: 'ADList',
  list: [],
  isLoading: true,
  scrollTop: 0
};

export default (state = initialState, action) => {
  if (state.pageID != action.pageID) return state;
  let nextstate;
  switch (action.type) {
    case AD_LIST_LOADING:
      nextstate = Object.assign({}, state, {isLoading: true});
      return nextstate;
    case AD_LIST_SUCCESS:
      nextstate = Object.assign({}, state, {list: action.payload, isLoading: false});
      return nextstate;
    case AD_LIST_FAILURE:
      nextstate = Object.assign({}, state, {isLoading: false});
      return nextstate;
    case AD_LIST_SETSCROLL:
      nextstate = Object.assign({}, state, {scrollTop: action.payload});
      return nextstate;
    default:
      return state;
  }
};
