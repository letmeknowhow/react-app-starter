/**
 *  Class: sample
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 日历reducer
 */
import { CALENDAR_DATE_CHANGED } from '../actions/actionTypes';
let initialState = {
  startDate: '',
  endDate: ''
};
// 新闻相关的 reducer

export default (state = initialState, action) => {
  let nextstate;
  switch (action.type) {
    case CALENDAR_DATE_CHANGED:
      if (action.payload.key == 'start') {
        nextstate = Object.assign({}, state, {startDate: action.payload.selected});
      } else {
        nextstate = Object.assign({}, state, {endDate: action.payload.selected});
      }
      return nextstate;
    default:
      return state;
  }
};
