/**
 *  Class: menu
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 分类
 */
import React, {Component} from 'react';
import {Link} from 'react-router';

import Tool from '../lib/Tool/Tool';
import {Header, Footer, Loading} from './../component/common/index';

import Page from '../component/page';

import WeUI from 'react-weui';
import 'weui';

const {Button, ActionSheet} = WeUI;

import '../css/menu.less';

export default class Menu extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      show: false,
      menus: [{
        label: '拍照',
        onClick: () => {
          console.log('拍照');
        }
      }, {
        label: '从手机相册选择',
        onClick: () => {
          console.log('从手机相册选择');
        }
      }],
      actions: [
        {
          label: '取消',
          onClick: this.hide.bind(this)
        }
      ]
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  render() {
    return (
      <Page title="ActionSheet" spacing>
        <Button onClick={this.show}>ActionSheet</Button>
        <ActionSheet menus={this.state.menus} actions={this.state.actions} show={this.state.show} onRequestClose={this.hide} />
        <div className="button_sp_area">
          <Link to="/"><Button type="primary" plain>首页</Button></Link>
          <Link to="/User"><Button type="default" plain>我的</Button></Link>
        </div>
      </Page>
    );
  }

  show() {
    this.setState({show: true});
  }

  hide() {
    this.setState({show: false});
  }
}

