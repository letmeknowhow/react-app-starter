/**
 *  Class: newslistReducer
 *  Author: Niu Xiaoyu
 *  Date: 16/2/16.
 *  Description: 新闻reducer
 */
import { NEWS_REQUEST, NEWS_SUCCESS, NEWS_FAILURE, NEWS_SETSCROLL } from '../action/actionTypes';
let initialState = {
  list: []
};
// 新闻相关的 reducer

const newslistReducer = (state = initialState, action) => {
  let nextstate;
  switch (action.type) {
    // 获取新闻列表成功
    case NEWS_SUCCESS:
      nextstate = Object.assign({}, state, {list: action.payload});
      return nextstate;
    // 新闻列表滚动
    case NEWS_SETSCROLL:
      nextstate = Object.assign({}, state, {scrollX: window.scrollX, scrollY: window.scrollY});
      return nextstate;
    default:
      return state;
  }
};

export default {newslistReducer};