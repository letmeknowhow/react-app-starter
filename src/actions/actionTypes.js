/**
 *  Class: actionTypes
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: action类型定义
 */

/**
 * 通用
 */
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const USER_GET_FAILURE = 'USER_GET_FAILURE';
/**
 * 新闻
 */
export const NEWS_LOADING = 'NEWS_LOADING';
export const NEWS_SUCCESS = 'NEWS_SUCCESS';
export const NEWS_FAILURE = 'NEWS_FAILURE';
export const NEWS_SETSCROLL = 'NEWS_SETSCROLL';

/**
 * 页面滚动状态
 */
export const PAGE_SCROLL = 'PAGE_SCROLL';

/**
 * 广告
 */
//地点选择
export const AD_PLACE_CHANGED = 'AD_PLACE_CHANGED';
//日历
export const CALENDAR_DATE_CHANGED = 'CALENDAR_DATE_CHANGED';

export const AD_GENERATE_SUCCESS = 'AD_GENERATE_SUCCESS';
export const AD_GENERATE_FAILURE = 'AD_GENERATE_FAILURE';
export const AD_GENERATE_DOING = 'AD_GENERATE_DOING';
export const AD_RECORD_VALUES = 'AD_RECORD_VALUES';
export const AD_INPUT_CHANGED = 'AD_INPUT_CHANGED';
export const AD_LIST_SUCCESS = 'AD_LIST_SUCCESS';
export const AD_LIST_FAILURE = 'AD_LIST_FAILURE';
export const AD_LIST_LOADING = 'AD_LIST_LOADING';
export const AD_GET_DETAIL_SUCCESS = 'AD_GET_DETAIL_SUCCESS';
export const AD_GET_DETAIL_FAILURE = 'AD_GET_DETAIL_FAILURE';