/**
 *  Class: containerScroll
 *  Author: Niu Xiaoyu
 *  Date: 16/7/15.
 *  Description: 记录页面滚动状态,任何页面需要记录滚动调状态时都可以使用该action,调用setScroll时必须传入一个全局唯一的字符串作为key
 */
import { PAGE_SCROLL } from './actionTypes';

const pageScroll = (pageID) => {
  return {
    type: PAGE_SCROLL,
    pageID
  };
};

export function setScroll(pageID) {
  return (dispatch) => {
    dispatch(pageScroll(pageID));
  };
}