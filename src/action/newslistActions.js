import WebAPI from '../lib/Tool/WebAPI';

import { NEWS_REQUEST, NEWS_SUCCESS, NEWS_FAILURE, NEWS_SETSCROLL } from './actionTypes';

import pic1 from '../assets/1.png';
import pic2 from '../assets/2.png';
import pic3 from '../assets/3.png';
import pic4 from '../assets/4.png';

const getNewsSuccess = (data) => {
  return {
    type: NEWS_SUCCESS,
    payload: data
  };
};
const getNewsFailed = (data) => {
  return {
    type: NEWS_FAILURE
  };
};
// 异步请求财富列表数据
const getNews = (opts) => {
  return dispatch => {
    /**
     * http请求远程图片
     */
    WebAPI.getNews(opts)
      .then((data) => {
        const bannerList = data.json.columnIssueList;
        let news = bannerList.map((banner, ind) => {
          return {
            id: ind,
            book_img: banner.picUrl,
            book_title: banner.title,
            book_content: banner.columnIssueId,
            book_click: 343
          };
        });
        dispatch(getNewsSuccess(news));
      });

    //dispatch(getNewsSuccess([
    //  {id: '1', book_img: pic1, book_title: '桑拿, 蒸腾芬兰', book_content: '你好,欢迎加入港中旅', book_click: 343},
    //  {id: '2', book_img: pic2, book_title: '伦敦, 新西区时代', book_content: '你好,欢迎加入港中旅', book_click: 343},
    //  {id: '3', book_img: pic3, book_title: '马里, 西非DNA', book_content: '你好,欢迎加入港中旅', book_click: 343},
    //  {id: '4', book_img: pic4, book_title: '曼哈顿, 文艺彻骨', book_content: '你好,欢迎加入港中旅', book_click: 343}
    //]));
  };
};

export default {getNews};