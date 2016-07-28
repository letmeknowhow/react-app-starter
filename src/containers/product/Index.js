/**
 *  Class: Index
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 主页
 */
/*
 react 相关
 */
import React, {Component} from 'react';
import {Link} from 'react-router';

/*
 redux 相关
 */
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {getNews, startLoading, setNewsScrollTop} from '../../actions/news';

import { VirtualScroll } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

import WeUI from 'react-weui';
import 'weui';

const {Toast} = WeUI;


/*
 公共react组件
 */
import {Header, Footer, Loading} from '../../component/common/index';

//行高
const ROW_HEIGHT = 229;
/*
 相关的模块调用
 */

/*
 组件入口文件
 */
class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      getNewsTimer: null
    };
    this.noRowsRenderer = this.noRowsRenderer.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.handlScroll = this.handlScroll.bind(this);
  }

  render() {
    const { state: { list, scrollTop, isLoading } } = this.props;

    return (
      <div>
        <Header leftTo={null} leftIcon={null} title={'新闻列表'} />
        <VirtualScroll
          ref="VirtualScroll"
          height={document.body.clientHeight - 85}
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
        <Footer index={0} />
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
      actions.getNews({columnId: 784});
    }
  }

  componentWillUnmount() {
    this.props.actions.setNewsScrollTop(this.scrollTop);
    if (this.state.getNewsTimer) clearTimeout(this.state.getNewsTimer);
  }

  noRowsRenderer() {
    return (
      <div>
        没有数据
      </div>
    );
  }

  handlScroll({clientHeight, scrollHeight, scrollTop}) {
    this.scrollTop = scrollTop;
    if (scrollHeight - clientHeight - scrollTop < 50) {
      this.handleInfiniteLoad();
    }
  }

  rowRenderer({ index, isScrolling }) {
    if (isScrolling) {
      return (
        <div>
          <span>
            Scrolling...
          </span>
        </div>
      );
    }

    const { state } = this.props;
    return (
      <Article
        key={index}
        index={index}
        article={state.list[index]}
      />
    );
  }

  handleInfiniteLoad() {
    const {state, actions} = this.props;
    if (state.isLoading) return;

    actions.startLoading();
    this.state.getNewsTimer = setTimeout(() => {
      actions.getNews({columnId: 784});
    }, 1000);
  }
}

/*
 文章列表
 */
class Article extends Component {
  render() {
    const { article: {id, bookTitle, bookContent, bookClick, bookImg} } = this.props;
    const content = `${bookContent.substring(0, 50)}...`;
    let images = null;
    if (/^http/.test(bookImg)) {
      images = (
        <div className="pictrue"><img src={bookImg} /></div>
      );
    } else {
      images = (
        <div className="pictrue"><img src={bookImg} /></div>
      );
    }
    return (
      <li>
        <Link to={`/ProductDetail/${bookTitle}`} >
          {images}
          <h3>{bookTitle}</h3>
          <div className="content">{content}</div>

          <div className="bottom" data-flex="main:justify">
            <div className="click">阅读：{bookClick}</div>

          </div>
        </Link>
      </li>
    );
  }
}

export default connect(state =>
    ({state: state.news}),
  (dispatch) => ({
    actions: bindActionCreators({getNews, startLoading, setNewsScrollTop}, dispatch)
  })
)(Index);