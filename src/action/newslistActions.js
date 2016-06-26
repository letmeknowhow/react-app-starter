//'use strict';
//import webApi from '../lib/Tool/WebAPI';

import { NEWS_REQUEST, NEWS_SUCCESS, NEWS_FAILURE, NEWS_SETSCROLL } from './actionTypes';

function getNewsSuccess(data) {
  return {
    type: NEWS_SUCCESS,
    payload: data
  };
}
// 异步请求财富列表数据
const getNews = (opts) => {
  return dispatch => {

    dispatch(getNewsSuccess([
      {id: '1', book_img: './build/1.png', book_title: '桑拿, 蒸腾芬兰', book_content: '你好,欢迎加入港中旅', book_click: 343},
      {id: '2', book_img: './build/2.png', book_title: '伦敦, 新西区时代', book_content: '你好,欢迎加入港中旅', book_click: 343},
      {id: '3', book_img: './build/3.png', book_title: '马里, 西非DNA', book_content: '你好,欢迎加入港中旅', book_click: 343},
      {id: '4', book_img: './build/4.png', book_title: '曼哈顿, 文艺彻骨', book_content: '你好,欢迎加入港中旅', book_click: 343}
    ]));
  };
}

export default {getNews};