/**
 *  Class: place
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 地点选择
 */
import { AD_PLACE_CHANGED } from '../actionTypes';

const selectPlace = (data, pageID) => {
  return {
    type: AD_PLACE_CHANGED,
    payload: data,
    pageID
  };
};


export function changePlace(opts, pageID) {
  return (dispatch, getState) => {
    dispatch(selectPlace(opts, pageID));
  };
}
