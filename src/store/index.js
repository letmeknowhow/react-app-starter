import configureStore from './configureStore';
import reducer from '../modules/reducers';

const store = configureStore(reducer);
window.Store = store;

if (module.hot) {
   module.hot.accept('../modules/reducers.js', () => {
      console.log('reducer changed');
      store.replaceReducer(require('../modules/reducers').default);
   });
}

export default store;
