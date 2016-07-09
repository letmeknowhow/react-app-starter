/**
 *  Class: page
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 使用shallowCompare控制组件更新
 */

import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class PureComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
}
