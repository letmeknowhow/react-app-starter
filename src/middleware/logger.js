/**
 * redux中间件，可在开发时根据自身需求调整
 */
export default ({ dispatch, getState }) => next => action => {
  // console.log(`action type: ${action.type}`);
  // console.log('当前状态');
  // console.log(getState());
  return next(action);
};