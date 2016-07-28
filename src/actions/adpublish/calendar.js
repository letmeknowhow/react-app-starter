/**
 *  Class: calendar
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 日历action
 */
import { CALENDAR_DATE_CHANGED } from '../actionTypes';

const selectDate = (data, pageID) => {
  return {
    type: CALENDAR_DATE_CHANGED,
    payload: data,
    pageID
  };
};


export function changeDate(opts, pageID) {
  return (dispatch, getState) => {
    dispatch(selectDate(opts, pageID));
  };
}
