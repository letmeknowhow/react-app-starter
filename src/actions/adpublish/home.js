/**
 *  Class: home
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 广告发布
 */
import WebAPI from '../../apis/WebAPI';
import {
  AD_GENERATE_SUCCESS,
  AD_GENERATE_FAILURE,
  AD_RECORD_VALUES,
  AD_GENERATE_DOING,
  AD_INPUT_CHANGED,
  AD_LIST_SUCCESS,
  AD_LIST_FAILURE,
  AD_LIST_SETSCROLL,
  AD_LIST_LOADING,
  AD_GET_DETAIL_SUCCESS,
  AD_GET_DETAIL_FAILURE
} from '../actionTypes';

const dispathSubmitSuccess = (pageID) => {
  return {
    type: AD_GENERATE_SUCCESS,
    pageID
  };
};
const dispathSubmitFailure = (pageID) => {
  return {
    type: AD_GENERATE_FAILURE,
    pageID
  };
};

const dispathDoingSubmit = (pageID) => {
  return {
    type: AD_GENERATE_DOING,
    pageID
  };
};

const dispathRecordValues = (data, pageID) => {
  return {
    type: AD_RECORD_VALUES,
    payload: data,
    pageID
  };
};

const dispathInputChanged = (data, pageID) => {
  return {
    type: AD_INPUT_CHANGED,
    payload: data,
    pageID
  };
};

export function generateAD(opts, pageID) {
  return (dispatch, getState) => {
    dispatch(dispathDoingSubmit(pageID));
    WebAPI.generateAD(opts).then((data) => {
      if (data.success) {
        // 请求用户成功
        dispatch(dispathSubmitSuccess(pageID));
      } else {
        dispatch(dispathSubmitFailure(pageID));
      }
    }, (err) => {
      dispatch(dispathSubmitFailure(pageID));
    });
  };
}

export function recordValues(opts, pageID) {
  return (dispatch, getState) => {
    dispatch(dispathRecordValues(opts, pageID));
  };
}

export function inputChanged(opts, pageID) {
  return (dispatch, getState) => {
    dispatch(dispathInputChanged(opts, pageID));
  };
}

/**
 * 广告产品列表
 */
const dispathGetADListSuccess = (data, pageID) => {
  return {
    type: AD_LIST_SUCCESS,
    payload: data,
    pageID
  };
};
const dispathGetADListFailure = (pageID) => {
  return {
    type: AD_LIST_FAILURE,
    pageID
  };
};

export function getADList(pageID) {
  return (dispatch) => {
    WebAPI.getADList()
      .then((data) => {
        if (data.success) {
          const list = data.json;
          let ads = list.map((item, ind) => {
            return {
              id: item.id,
              name: item.name,
              tagType: item.tagType,
              price: item.price,
              departure: item.departure,
              destination: item.destination,
              productPresent: item.productPresent,
              commissionPolicy: item.commissionPolicy
            };
          });
          dispatch(dispathGetADListSuccess(ads, pageID));
        } else {
          console.log('获取广告产品列表失败!');
          console.log(data.errorMessage);
          dispatch(dispathGetADListFailure(pageID));
        }
      })
      .catch(() => {
        console.log('获取广告产品列表失败!');
        dispatch(dispathGetADListFailure(pageID));
      });
    //const oriData = getState().listAD.list;
    //const newData = oriData.concat([
    //  {
    //    'id': 61,
    //    'name': '123',
    //    'userId': '1000000019859',
    //    'begValidityPeriod': null,
    //    'validityPeriod': null,
    //    'tagType': '出境游',
    //    'price': '123',
    //    'commissionPolicy': '123',
    //    'erpProductId': null,
    //    'externalLink': null,
    //    'createDate': 1469176023000,
    //    'productNumber': null,
    //    'departure': '123',
    //    'destination': '123',
    //    'productPresent': '123',
    //    'productHfLibraryPictures': null
    //  }, {
    //    'id': 62,
    //    'name': '火星终身游',
    //    'userId': '1000000019859',
    //    'begValidityPeriod': 1469116800000,
    //    'validityPeriod': 1469116800000,
    //    'tagType': '出境游',
    //    'price': '1000000',
    //    'commissionPolicy': '123',
    //    'erpProductId': null,
    //    'externalLink': null,
    //    'createDate': 1469180750000,
    //    'productNumber': null,
    //    'departure': '北京',
    //    'destination': '澳大利亚',
    //    'productPresent': '123',
    //    'productHfLibraryPictures': null
    //  }, {
    //    'id': 63,
    //    'name': '水星游',
    //    'userId': '1000000019859',
    //    'begValidityPeriod': 1469203200000,
    //    'validityPeriod': 1469894400000,
    //    'tagType': '出境游',
    //    'price': '222',
    //    'commissionPolicy': '222',
    //    'erpProductId': null,
    //    'externalLink': null,
    //    'createDate': 1469181307000,
    //    'productNumber': null,
    //    'departure': '北京',
    //    'destination': '柬埔寨',
    //    'productPresent': '222',
    //    'productHfLibraryPictures': null
    //  }, {
    //    'id': 64,
    //    'name': '手机测试',
    //    'userId': '1000000019859',
    //    'begValidityPeriod': 1469203200000,
    //    'validityPeriod': 1469894400000,
    //    'tagType': '出境游',
    //    'price': '123',
    //    'commissionPolicy': '测试',
    //    'erpProductId': null,
    //    'externalLink': null,
    //    'createDate': 1469182690000,
    //    'productNumber': null,
    //    'departure': '北京',
    //    'destination': '印度',
    //    'productPresent': '测试',
    //    'productHfLibraryPictures': null
    //  }, {
    //    'id': 21,
    //    'name': '海南一日游',
    //    'userId': '1000000019859',
    //    'begValidityPeriod': 1468512000000,
    //    'validityPeriod': 1468598400000,
    //    'tagType': '2',
    //    'price': '10000',
    //    'commissionPolicy': '1500',
    //    'erpProductId': null,
    //    'externalLink': null,
    //    'createDate': 1468575315000,
    //    'productNumber': null,
    //    'departure': '北京',
    //    'destination': '海南',
    //    'productPresent': '来一场说走就走的旅行，领略海南不一样的韵味！',
    //    'productHfLibraryPictures': null
    //  }, {
    //    'id': 81,
    //    'name': '123',
    //    'userId': '1000000019859',
    //    'begValidityPeriod': 1469116800000,
    //    'validityPeriod': 1469116800000,
    //    'tagType': '出境游',
    //    'price': '123',
    //    'commissionPolicy': '123',
    //    'erpProductId': null,
    //    'externalLink': null,
    //    'createDate': 1469203262000,
    //    'productNumber': null,
    //    'departure': '123',
    //    'destination': '123',
    //    'productPresent': '123',
    //    'productHfLibraryPictures': null
    //  }
    //]);
    //dispatch(dispathGetADListSuccess(newData));
  };
}

const dispathSetADListScrollTop = (data, pageID) => {
  return {
    type: AD_LIST_SETSCROLL,
    payload: data,
    pageID
  };
};

export function setADListScrollTop(top, pageID) {
  return (dispatch) => {
    dispatch(dispathSetADListScrollTop(top, pageID));
  };
}

const dispathStartLoadingADList = (pageID) => {
  return {
    type: AD_LIST_LOADING,
    pageID
  };
};

export function startLoadingADList(pageID) {
  return (dispatch) => {
    dispatch(dispathStartLoadingADList(pageID));
  };
}


/**
 * 获取广告产品详情
 */
const dispathGetADProductDetailSuccess = (data, pageID) => {
  return {
    type: AD_GET_DETAIL_SUCCESS,
    payload: data,
    pageID
  };
};
const dispathGetADProductDetailFailure = (pageID) => {
  return {
    type: AD_GET_DETAIL_FAILURE,
    pageID
  };
};

export function getADProductDetail(opts, pageID) {
  return (dispatch) => {
    WebAPI.getAdProduct(opts)
      .then((data) => {
        if (data.success) {
          const adInfo = data.json;
          dispatch(dispathGetADProductDetailSuccess(adInfo, pageID));
        } else {
          console.log('获取广告产品详情失败!');
          dispatch(dispathGetADProductDetailFailure(pageID));
        }
      })
      .catch((e) => {
        console.log('获取广告产品详情失败!');
        dispatch(dispathGetADProductDetailFailure(pageID));
      });
  };
}

/**
 * 修改
 */
export function modifyAD(opts, pageID) {
  return (dispatch, getState) => {
    dispatch(dispathDoingSubmit(pageID));
    WebAPI.modifyAD(opts).then((data) => {
      if (data.success) {
        // 修改成功
        dispatch(dispathSubmitSuccess(pageID));
      } else {
        console.log('修改广告产品失败');
        dispatch(dispathSubmitFailure(pageID));
      }
    }, (err) => {
      console.log('修改广告产品失败');
      dispatch(dispathSubmitFailure(pageID));
    });
  };
}