/**
 *  Class: news
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 新闻reducer
 */
import { NEWS_REQUEST, NEWS_SUCCESS, NEWS_FAILURE, NEWS_SETSCROLL } from '../actions/actionTypes';
let initialState = {
  list: []
};
// 新闻相关的 reducer

export default (state = initialState, action) => {
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
