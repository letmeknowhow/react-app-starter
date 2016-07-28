/**
 *  Class: common
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 新闻action
 */
import WebAPI from '../apis/WebAPI';

import { USER_GET_SUCCESS, USER_GET_FAILURE } from './actionTypes';


const getUserSuccess = (data, pageID) => {
  return {
    type: USER_GET_SUCCESS,
    payload: data,
    pageID
  };
};

const getUserFailure = (pageID) => {
  return {
    type: USER_GET_FAILURE,
    pageID
  };
};

// 异步请求新闻列表数据
export function getUserInfo(pageID) {
  return (dispatch) => {
    WebAPI.getUserInfo()
      .then((data) => {
        if (data.success) {
          const userInfo = data.json;
          dispatch(getUserSuccess(userInfo, pageID));
        } else {
          console.log('获取用户信息失败!');
          dispatch(getUserFailure(pageID));
        }
      })
      .catch(() => {
        console.log('获取用户信息失败!');
        dispatch(getUserFailure(pageID));
      });
    //dispatch(getUserSuccess({
    //  department: '中旅总社',
    //  name: '牛晓宇',
    //  phoneNum: '12345678901'
    //}));
  };
}