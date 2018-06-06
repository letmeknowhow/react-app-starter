import { combineReducers } from 'redux';
import skuunit from './skuunit/skuunit';
import newSkuunit from './skuunit/newSkuunit';
import userErrorHandler from './common/userErrorHandler';
import scopeSelection from './skuunit/scopeSelection';

const reducers = {
  userErrorHandler,
  skuunit,
  newSkuunit,
  scopeSelection,
};

export default combineReducers(reducers);
