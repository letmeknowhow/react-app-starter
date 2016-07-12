/**
 *  Class: menu
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 分类
 */
import React, {Component} from 'react';
import {Link} from 'react-router';

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

    this.selectedDate = this.props.params.selected || (new Date('2016/7/20').Format('yyyy-MM-dd'));

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  render() {
    return (
      <Page title="ActionSheet" spacing>
        <Button onClick={this.show}>ActionSheet</Button>
        <ActionSheet
          menus={this.state.menus}
          actions={this.state.actions}
          show={this.state.show}
         onRequestClose={this.hide}
        />
        <div className="logins" data-flex="box:justify dir:right cross:center">
          <Link to="/" activeStyle={{color: 'red'}}>
            <Button style={{height: 100}} type="primary" plain>首页</Button>
          </Link>
          <Link to="/User"><Button style={{height: 50}} type="default" plain>我的1</Button></Link>
          <Link to="/User"><Button style={{height: 70}} type="default" plain>我的2</Button></Link>
        </div>
        <div style={{width: '90%', backgroundColor: 'gray'}} data-flex="box:first">
          <div style={{width: 70}} data-flex="box:mean">
            <div>日期:</div>
          </div>
          <div className="value">
            <Link to={`/DateSelector/${this.selectedDate}`}>
              <input style={{borderWidth: 1, borderColor: 'black'}} type="text" defaultValue={this.selectedDate} placeholder="日期" />
            </Link>
          </div>
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