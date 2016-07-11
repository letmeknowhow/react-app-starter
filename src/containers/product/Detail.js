/**
 *  Class: Detail
 *  Author: Niu Xiaoyu
 *  Date: 16/7/11.
 *  Description: 产品详情
 */
import React, {Component} from 'react';

/*
 redux 相关
 */

import {Header, Footer, Loading} from '../../component/common/index';


export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.start = () => {
      console.log('开始加载');
    };
    this.success = () => {
      console.log('加载成功');
    };
    this.error = () => {
      console.log('开始加载');
    };
  }

  render() {
    return (
      <div>
        <Header leftTo="/" leftIcon="fanhui" title="产品详情" />
        <div>{this.props.params.productTitle}</div>
      </div>
    );
  }
}