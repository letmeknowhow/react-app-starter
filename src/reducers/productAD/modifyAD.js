/**
 *  Class: modifyAD
 *  Author: Niu Xiaoyu
 *  Date: 16/7/14.
 *  Description: 修改广告
 */
import {
  PAGE_SCROLL,
  CALENDAR_DATE_CHANGED,
  AD_PLACE_CHANGED,
  AD_GENERATE_SUCCESS,
  AD_GENERATE_FAILURE,
  AD_GENERATE_DOING,
  AD_RECORD_VALUES,
  AD_INPUT_CHANGED,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  AD_GET_DETAIL_SUCCESS,
  AD_GET_DETAIL_FAILURE
} from '../../actions/actionTypes';

let initialState = {
  scrollX: 0,
  scrollY: 0,
  pageID: 'ModifyAD',
  submitStatus: 'ready',   //ready: 未提交; doing: 正在提交; done:已经提交;
  uploadedFIle: '', //组件中img的src地址

  id: '',
  name: '', //产品名称
  departure: '', //出发地
  destination: '', //目的地
  tagType: '', //产品类型
  price: '', //产品价格
  commissionPolicy: '',         //同业返利
  productPresent: '',      //产品简介
  startDate: new Date().Format('yyyy-MM-dd'),  //有效期
  endDate: new Date().Format('yyyy-MM-dd'),    //有效期
  pics: [],     //产品图片路径
  productOffer: '',   //产品提供
  contact: '',        //联系人
  mobile: ''   //电话
};

export default (state = initialState, action) => {
  if (state.pageID != action.pageID) return state;
  let nextstate;
  switch (action.type) {
    case CALENDAR_DATE_CHANGED:
      if (action.payload.key == 'start') {
        nextstate = Object.assign({}, state, {startDate: action.payload.selected});
      } else {
        nextstate = Object.assign({}, state, {endDate: action.payload.selected});
      }
      return nextstate;
    case AD_PLACE_CHANGED:
      if (action.payload.key == 'start') {
        nextstate = Object.assign({}, state, {departure: action.payload.selected});
      } else {
        nextstate = Object.assign({}, state, {destination: action.payload.selected});
      }
      return nextstate;
    case PAGE_SCROLL:
      nextstate = Object.assign({}, state, {scrollX: window.scrollX, scrollY: window.scrollY});
      return nextstate;
    case AD_RECORD_VALUES:
      nextstate = Object.assign({}, state, action.payload);
      return nextstate;
    case AD_INPUT_CHANGED:
      nextstate = Object.assign({}, state, action.payload);
      return nextstate;
    case AD_GENERATE_SUCCESS:
      nextstate = Object.assign({}, state, {submitStatus: 'done'});
      return nextstate;
    case AD_GENERATE_FAILURE:
      nextstate = Object.assign({}, state, {submitStatus: 'ready'});
      return nextstate;
    case AD_GENERATE_DOING:
      nextstate = Object.assign({}, state, {submitStatus: 'doing'});
      return nextstate;
    case USER_GET_SUCCESS:
      nextstate = Object.assign({}, state, {
        productOffer: action.payload.department,
        contact: action.payload.name,
        mobile: action.payload.phoneNum
      });
      return nextstate;
    case AD_GET_DETAIL_SUCCESS:
      nextstate = Object.assign({}, state, {
        id: action.payload.id,
        name: action.payload.name,
        startDate: action.payload.startDate && action.payload.startDate.substr(0, 10),
        endDate: action.payload.endDate && action.payload.endDate.substr(0, 10),
        tagType: action.payload.tagType,
        price: action.payload.price,
        commissionPolicy: action.payload.commissionPolicy,
        departure: action.payload.departure,
        destination: action.payload.destination,
        productPresent: action.payload.productPresent
      });

      //如果有图片,提取图片信息
      if (action.payload.pics && action.payload.pics.length) {
        nextstate = Object.assign(nextstate, {
          uploadedFIle: process.env.NODE_ENV === 'production' ? action.payload.pics[0].picturePath : `http://tcray.tunnel.qydev.com/${action.payload.pics[0].picturePath}`,
          pics: [                               //产品图片
            {
              picturePath: action.payload.pics[0].picturePath,
              id: action.payload.pics[0].id
            }
          ]
        });
      }
      return nextstate;
    default:
      return state;
  }
};
