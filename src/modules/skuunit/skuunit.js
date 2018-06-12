/**
 * author: niuxiaoyu
 * description: 单元
 * date: 2018/6/6
 */
import { ACTION_TYPE_ADD_ERROR } from 'constants/constant';

import {
  showSkuunitListApi,
  updateSkuUnitPauseApi,
  modiSkuUnitNameApi,
  deleteSkuUnitApi,
  updateSkuUnitApi,
  getSkuSetInfoListApi,
  makeSelectedSkuUnitGrpTreeApi,
  updateSkuUnitRelationApi,
} from 'api/skuunit';

export const GET_SKUSET_INFO_LIST = 'skuunit/GET_SKUSET_INFO_LIST';

const SHOW_LOADING = 'skuunit/SHOW_LOADING';
const HIDE_LOADING = 'skuunit/HIDE_LOADING';
const SHOW_SKU_UNIT_LIST = 'skuunit/SHOW_SKU_UNIT_LIST';
const UPDATE_SKUUNIT_PAUSE = 'skuunit/UPDATE_SKUUNIT_PAUSE';
const MODI_SKUUNIT_NAME = 'skuunit/MODI_SKUUNIT_NAME';
const DELETE_SKUUNIT = 'skuunit/DELETE_SKUUNIT';
const UPDATE_SKUUNIT_SKUSET = 'skuunit/UPDATE_SKUUNIT_SKUSET';
const UPDATE_SKUUNIT_RELATION = 'skuunit/UPDATE_SKUUNIT_RELATION';
const UPDATE_EXCLUDE_KEY = 'skuunit/UPDATE_EXCLUDE_KEY';
const SHOW_MODAL_DIALOG = 'skuunit/SHOW_MODAL_DIALOG';


const initialState = {
  skuunitList: [],
  ajaxpc: null,
  isLoading: false,
  error: '',
  skusetList: [],
  showModal: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case HIDE_LOADING:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case SHOW_SKU_UNIT_LIST:
      return Object.assign({}, state, {
        skuunitList: action.payload.data,
        ajaxpc: action.payload.ajaxpc[0]
      });
    case UPDATE_SKUUNIT_PAUSE:
      return Object.assign({}, state, {
        skuunitList: _changeUnitState(state.skuunitList, action.payload)
      });
    case MODI_SKUUNIT_NAME:
      return Object.assign({}, state, {
        skuunitList: _changeUnitName(state.skuunitList, action.payload)
      });
    case DELETE_SKUUNIT:
      return Object.assign({}, state, {
        skuunitList: _deleteskuUnits(state.skuunitList, action.payload)
      });
    case GET_SKUSET_INFO_LIST:
      return Object.assign({}, state, {
        skusetList: action.payload.data,
      });
    case UPDATE_SKUUNIT_SKUSET:
      return Object.assign({}, state, {
        skuunitList: _changeSkuset4Unit(state.skuunitList, action.payload),
        showModal: false,
      });
    case UPDATE_SKUUNIT_RELATION:
      return Object.assign({}, state, {
        skuunitList: _changeScope4Unit(state.skuunitList, action.payload.data[0]),
        showModal: false,
      });
    case SHOW_MODAL_DIALOG:
      return Object.assign({}, state, {
        showModal: true,
      });
    default:
      return state;
  }
}

/**
 * 启用/暂停单元
 * @param {*} source 
 * @param {*} skuUnitIdList 
 * @param {*} isPause 
 */
const _changeUnitState = (source, params) => {
  const { skuUnitIdList, isPause } = params;
  const newSource = [...source];
  for (let i = 0; i < newSource.length; i++) {
    const target = skuUnitIdList.find(skuUnitId => skuUnitId === newSource[i].skuUnitId);
    if (target) {
      newSource[i].isPause = isPause;
    }
  }
  return newSource;
}

/**
 * 修改单元名称
 * @param {*} source 
 * @param {*} params 
 */
const _changeUnitName = (source, params) => {
  const { skuUnitId, skuUnitName } = params;
  const newSource = [...source];
  const target = newSource.find(item => item.skuUnitId === skuUnitId);
  if (target) {
    target.skuUnitName = skuUnitName;
  }
  return newSource
}

/**
 * 修改单元绑定的集合
 * @param {*} source 
 * @param {*} params 
 */
const _changeSkuset4Unit = (source, params) => {
  const { skuUnitId, skuSetId, skuSetName } = params;
  const newSource = [...source];
  const target = newSource.find(item => item.skuUnitId === skuUnitId);
  if (target) {
    target.skuSetId = skuSetId;
    target.skuSetName = skuSetName;
  }
  return newSource
}

/**
 * 修改单元的投放范围
 * @param {*} source 
 * @param {*} params 
 */
const _changeScope4Unit = (source, params) => {
  const { skuUnitId, groupCount, planCount } = params;
  const newSource = [...source];
  const target = newSource.find(item => item.skuUnitId === skuUnitId);
  if (target) {
    target.groupCount = groupCount;
    target.planCount = planCount;
  }
  return newSource
}

/**
 * 删除单元
 * @param {*} source 
 * @param {*} skuUnitIdList 
 */
const _deleteskuUnits = (source, params) => {
  const { skuUnitIdList } = params;
  const newSource = [];
  for (let i = 0; i < source.length; i++) {
    const target = skuUnitIdList.find(skuUnitId => skuUnitId === source[i].skuUnitId);
    if (!target) {
      newSource.push(source[i]);
    }
  }
  return newSource;
}

/**
 * 单元列表查询展示
 * @param {*} params 
 */
export function showSkuunitList(planName) {
  return async dispatch => {
    try {
      dispatch({ type: SHOW_LOADING });
      const res = await showSkuunitListApi(planName);
      await dispatch({ type: SHOW_SKU_UNIT_LIST, payload: res });
      dispatch({ type: HIDE_LOADING });
    } catch (err) {
      dispatch({ type: HIDE_LOADING });
      console.log(err);
    }
  };
}

/**
 * 单元列表查询展示
 * @param {*} params 
 */
export function getSkuSetInfoList() {
  return async dispatch => {
    try {
      const res = await getSkuSetInfoListApi();
      await dispatch({ type: GET_SKUSET_INFO_LIST, payload: res });
    } catch (err) {
      console.log(err);
    }
  };
}

/**
 * 启用/暂停单元
 * @param {} params 
 */
export function updateSkuUnitPause(skuUnitIdList, isPause) {
  return async dispatch => {
    try {
      const param = { skuUnitIdList, isPause };
      const res = await updateSkuUnitPauseApi(param);
      dispatch({ type: UPDATE_SKUUNIT_PAUSE, payload: param, res });     
    } catch (err) {
      dispatch({ type: ACTION_TYPE_ADD_ERROR, payload: { errorMsg: err } });
    }
  };
}

/**
 * 修改单元名称
 * @param {} params 
 */
export function modiSkuUnitName(id, name) {
  return async dispatch => {
    try {
      const param = { skuUnitId: id, skuUnitName: name };
      const res = await modiSkuUnitNameApi(param);
      dispatch({ type: MODI_SKUUNIT_NAME, payload: param, res });
    } catch (err) {
      dispatch({ type: ACTION_TYPE_ADD_ERROR, payload: { errorMsg: err } });
    }
  };
}

/**
 * 删除单元
 * @param {} skuUnitIdList 
 */
export function deleteSkuUnit(skuUnitIdList) {
  return async dispatch => {
    try {
      const param = { skuUnitIdList };
      const res = await deleteSkuUnitApi(param);
      dispatch({ type: DELETE_SKUUNIT, payload: param, res });
    } catch (err) {
      dispatch({ type: ACTION_TYPE_ADD_ERROR, payload: { errorMsg: err } });
    }
  };
}

/**
 * 修改单元投放范围
 * @param {*} skuUnitId 
 * @param {*} planIdList 
 * @param {*} groupIdList 
 */
export function updateSkuUnitRelation(skuUnitId, planIdList, groupIdList) {
  return async dispatch => {
    try {
      const param = { skuUnitId, planIdList, groupIdList };
      const res = await updateSkuUnitRelationApi(param);
      dispatch({ type: UPDATE_SKUUNIT_RELATION, payload: res });
    } catch (err) {
      dispatch({ type: ACTION_TYPE_ADD_ERROR, payload: { errorMsg: err } });
    }
  };
}

/**
 * 修改排除词
 * @param {*} skuUnitId 
 * @param {*} planIdList 
 * @param {*} groupIdList 
 */
export function updateExcludeKey(skuUnitId, excludeKeyList) {
  return async dispatch => {
    try {
      const param = { skuUnitId, excludeKeyList };
      const res = await updateExcludeKeyApi(param);
      dispatch({ type: UPDATE_EXCLUDE_KEY, payload: res });
    } catch (err) {
      dispatch({ type: ACTION_TYPE_ADD_ERROR, payload: { errorMsg: err } });
    }
  };
}


/**
 * modal窗口打开
 */
export function showModalDialog() {
  return async dispatch => {
      dispatch({ type: SHOW_MODAL_DIALOG});    
  };
}