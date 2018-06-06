/**
 * author: niuxiaoyu
 * description: 编辑投放范围
 * date: 2018/6/6
 */
import {
  makeSelectedSkuUnitGrpTreeApi,
  makeSkuUnitPlanTreeApi,
} from 'api/skuunit';

const MAKE_SELECTED_SKUUNIT_GRP_TREE = 'scopeSelection/MAKE_SELECTED_SKUUNIT_GRP_TREE';
const MAKE_SKUUNIT_PLAN_TREE = 'scopeSelection/MAKE_SKUUNIT_PLAN_TREE';
const LOADING_L_START = 'scopeSelection/LOADING_L_START';
const LOADING_L_END = 'scopeSelection/LOADING_L_END';
const LOADING_R_START = 'scopeSelection/LOADING_R_START';
const LOADING_R_END = 'scopeSelection/LOADING_R_END';

const initialState = {
  unitPlanTree: [],
  unitSelectedTree: [],    //单元已选定投放计划组
  loadingL: false,
  loadingR: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case MAKE_SELECTED_SKUUNIT_GRP_TREE:
      return Object.assign({}, state, {
        unitSelectedTree: action.payload.data && action.payload.data[0].children
      });
    case MAKE_SKUUNIT_PLAN_TREE:
      return Object.assign({}, state, {
        unitPlanTree: action.payload.data && action.payload.data[0].children
      });
    case LOADING_L_START:
      return Object.assign({}, state, {
        loadingL: true,
      });
    case LOADING_L_END:
      return Object.assign({}, state, {
        loadingL: false,
      });
    case LOADING_R_START:
      return Object.assign({}, state, {
        loadingR: true,
      });
    case LOADING_R_END:
      return Object.assign({}, state, {
        loadingR: false,
      });
    default:
      return state;
  }
}

/**
 * 投放范围——计划
 * @param {*} skuUnitId 单元id
 */
export function makeSkuUnitPlanTree(skuUnitId) {
  return async dispatch => {
    try {
      dispatch({type: LOADING_L_START})
      const res = await makeSkuUnitPlanTreeApi({ skuUnitId });
      await dispatch({ type: MAKE_SKUUNIT_PLAN_TREE, payload: res });
      dispatch({type: LOADING_L_END})
    } catch (err) {
      dispatch({type: LOADING_L_END})
    }
  };
}

/**
 * 查询已经添加到单元的计划id和组id
 * @param {*} params 
 */
export function makeSelectedSkuUnitGrpTree(skuUnitId) {
  return async dispatch => {
    try {
      dispatch({type: LOADING_R_START})
      const res = await makeSelectedSkuUnitGrpTreeApi({ skuUnitId });
      await dispatch({ type: MAKE_SELECTED_SKUUNIT_GRP_TREE, payload: res });
      dispatch({type: LOADING_R_END})
    } catch (err) {
      dispatch({type: LOADING_R_END})
    }
  };
}