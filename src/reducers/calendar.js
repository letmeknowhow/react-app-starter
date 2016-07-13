/**
 *  Class: calendar
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 日历reducer
 */
import { CALENDAR_SELECTED_CHANGED } from '../actions/actionTypes';
let initialState = {
  selected: ''
};
// 新闻相关的 reducer

export default (state = initialState, action) => {
  let nextstate;
  switch (action.type) {
    case CALENDAR_SELECTED_CHANGED:
      nextstate = Object.assign({}, state, {selected: action.payload});
      return nextstate;
    default:
      return state;
  }
};
