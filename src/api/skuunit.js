import { get, post } from '../common/request';

/**
 * 单元列表查询展示
 * @param {*} params 
 */
export function showSkuunitListApi(params) {
  if (!params) {
    return Promise.reject('params is wrong');
  }
  return get('/skuunit/showSkuUnitList.action', params)
    .then(res => {
      // 开发时调试等待效果;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve(res);
        }, 1000);
      });
    })
    .then(res => {
      return res.data
    });
}

/**
 * 启用/暂停单元
 * @param {} params 
 */
export function updateSkuUnitPauseApi(params) {
  if (!params) {
    return Promise.reject('params is wrong');
  }
  return post('/skuunit/updateSkuUnitPause.action', params)
    .then(res => {
      return res.data
    });
}

/**
 * 修改单元名称
 * @param {} params 
 */
export function modiSkuUnitNameApi(params) {
  if (!params) {
    return Promise.reject('params is wrong');
  }
  return post('/skuunit/modiSkuUnitName.action', params)
    .then(res => {
      return res.data
    });
}

/**
 * 删除单元
 * @param {} params 
 */
export function deleteSkuUnitApi(params) {
  if (!params) {
    return Promise.reject('params is wrong');
  }
  return post('/skuunit/deleteSkuUnit.action', params)
    .then(res => {
      return res.data
    });
}

/**
 * 新建单元
 * @param {} params 
 */
export function createNewOneApi(params) {
  if (!params) {
    return Promise.reject('params is wrong');
  }
  return post('/skuunit/createNewOne.action', params)
    .then(res => {
      // 开发时调试等待效果;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve(res);
        }, 1000);
      });
    })
    .then(res => {
      return res.data
    });
}

/**
 * 查询集合（返回id和名称列表，新建推广单元下拉列表使用）
 * @param {*} params 
 */
export function getSkuSetInfoListApi() {
  return get('/skuunit/getSkuSetInfoList.action')
    .then(res => {
      return res.data
    });
}

/**
 * 投放范围——计划
 * @param {*} params 
 */
export function makeSkuUnitPlanTreeApi(params) {
  return get('/skuunit/makeSkuUnitPlanTree.action', params)
    .then(res => {
      return res.data
    });
}

/**
 * 查询已经添加到单元的计划id和组id
 * @param {*} params 
 */
export function makeSelectedSkuUnitGrpTreeApi(params) {
  return get('/skuunit/makeSelectedSkuUnitGrpTree.action', params)
    .then(res => {
      return res.data
    });
}

/**
 * 修改单元投放范围
 * @param {*} params 
 */
export function updateSkuUnitRelationApi(params) {
  if (!params) {
    return Promise.reject('params is wrong');
  }
  return post('/skuunit/updateSkuUnitRelation.action', params)
    .then(res => {
      // 开发时调试等待效果;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve(res);
        }, 1000);
      });
    })
    .then(res => {
      return res.data
    });
}


/**
 * 修改排除词
 * @param {*} params 
 */
export function updateExcludeKeyApi(params) {
  if (!params) {
    return Promise.reject('params is wrong');
  }
  return post('/skuunit/updateExcludeKey.action', params)
    .then(res => {
      return res.data
    });
}