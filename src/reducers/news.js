/**
 *  Class: news
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 新闻reducer
 */
import { NEWS_LOADING, NEWS_SUCCESS, NEWS_FAILURE, NEWS_SETSCROLL } from '../actions/actionTypes';
let initialState = {
  list: [],
  isLoading: true
};
// 新闻相关的 reducer

export default (state = initialState, action) => {
  let nextstate;
  switch (action.type) {
    // 正在获取新闻列表
    case NEWS_LOADING:
      nextstate = Object.assign({}, state, {list: action.payload, isLoading: true});
      return nextstate;
    // 获取新闻列表成功
    case NEWS_SUCCESS:
      nextstate = Object.assign({}, state, {list: action.payload, isLoading: false});
      return nextstate;
    default:
      return state;
  }
};
