/**
 *  Class:
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 根据当前node环境启用不同的store
 */

import devStore from './configureStore.dev';
import prodStore from './configureStore.prod';

export default process.env.NODE_ENV === 'production' ? prodStore : devStore;