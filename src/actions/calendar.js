/**
 *  Class: calendar
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 日历action
 */
import WebAPI from '../apis/WebAPI';

import { CALENDAR_DATE_CHANGED } from './actionTypes';

const selectDate = (data) => {
  return {
    type: CALENDAR_DATE_CHANGED,
    payload: data
  };
};


export function changeDate(opts) {
  return (dispatch, getState) => {
    dispatch(selectDate(opts));
  };
}
