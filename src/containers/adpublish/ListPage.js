/**
 *  Class: ListPage
 *  Author: lvpeipei
 *  Date: 2016/7/22.
 *  Description:产品列表页
 */
import React, {Component} from 'react';

import {Link} from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { VirtualScroll } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

import WeUI from 'react-weui';
import 'weui';
const {Toast} = WeUI;

import {Header} from '../../component/common/index';
import '../../css/ListPage.less';

import {getADList, setADListScrollTop, startLoadingADList} from '../../actions/adpublish/home';

//行高
const ROW_HEIGHT = 70;

const PAGE_ID = 'ADList';

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getListTimer: null
    };
    this.noRowsRenderer = this.noRowsRenderer.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.handlScroll = this.handlScroll.bind(this);
  }

  render() {
    const { state: { list, scrollTop, isLoading } } = this.props;

    return (
      <div className="list-page-bg">
        <Header leftTo={null} leftIcon={null} title={'我发布的广告'} />
        <div className="listpage-box">
          <div className="mar-top15" data-flex="dir:right">
            <Link to="/PublishAD">
              <div className="add-pub">增加产品</div>
            </Link>
          </div>
        </div>
        <VirtualScroll
          ref="VirtualScroll"
          height={document.body.clientHeight - (35 + 15 + 31)}   //35为header高度, 31正价产品按钮高度,15间隔
          overscanRowCount={3}
          noRowsRenderer={this.noRowsRenderer}
          rowCount={list.length}
          rowHeight={ROW_HEIGHT}
          rowRenderer={this.rowRenderer}
          scrollTop={scrollTop}
          width={document.body.clientWidth}
          onScroll={this.handlScroll}
        />
        <Toast icon="loading" show={isLoading}>正在加载中...</Toast>
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    //判断新的状态是否与现有状态一致,如果一致,则返回false,阻止更新
    //该函数默认返回true
    return nextProps.state != this.props.state;
  }

  componentDidMount() {
    const {state, actions} = this.props;
    if (state.list.length > 0) {
      return;
    } else {
      actions.getADList(PAGE_ID);
    }
  }

  componentWillUnmount() {
    this.props.actions.setADListScrollTop(this.scrollTop, PAGE_ID);
    if (this.state.getListTimer) clearTimeout(this.state.getListTimer);
  }

  noRowsRenderer() {
    return (
      <div>
        没有数据
      </div>
    );
  }

  handlScroll({clientHeight, scrollHeight, scrollTop}) {
    if (scrollHeight - clientHeight - scrollTop < 50 && (this.scrollTop - scrollTop) < 5) {
      this.handleInfiniteLoad();
    }
    this.scrollTop = scrollTop;
  }

  rowRenderer({ index, isScrolling }) {
    const { state } = this.props;
    return (
      <ADItem
        key={index}
        index={index}
        productItem={state.list[index]}
      />
    );
  }

  handleInfiniteLoad() {
    const {state, actions} = this.props;
    if (state.isLoading) return;

    actions.startLoadingADList(PAGE_ID);
    this.state.getListTimer = setTimeout(() => {
      actions.getADList(PAGE_ID);
    }, 1000);
  }
}

class ADItem extends Component {
  render() {
    const { productItem: {id, name, tagType, price, departure, destination, productPresent, commissionPolicy} } = this.props;
    //const content = `${productPresent.substring(0, 50)}...`;
    return (
      <Link to={`ModifyAD/${id}`}>
        <li className="list-item">
          <h3>{name}</h3>
          <div className="list-detil">
            <div data-flex="box:mean">
              <div>出发地：{departure}</div>
              <div>目的地：{destination}</div>
            </div>
            <div data-flex="box:mean">
              <div className="nowrap">描述：{productPresent}</div>
              <div>价格：￥{price}</div>
            </div>
          </div>
        </li>
      </Link>
    );
  }
}

export default connect(state =>
    ({state: state.listAD}),
  (dispatch) => ({
    actions: bindActionCreators({getADList, setADListScrollTop, startLoadingADList}, dispatch)
  })
)(ListPage);