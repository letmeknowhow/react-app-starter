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
import {getNews} from '../../actions/news';

import Infinite from 'react-infinite';

/*
 公共react组件
 */
import {Header, Footer, Loading} from '../../component/common/index';

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
      isInfiniteLoading: false
    };
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
  }

  render() {
    const { state } = this.props;
    let main = state.list.map((article, index) => {
      return (
        <Article
          key={index}
          article={article}
        />
      );
    });

    let index = 0;
    let leftTo = null;
    let leftIcon = null;


    return (
      <div>
        <Header leftTo={leftTo} leftIcon={leftIcon} title={'新闻列表'} />
        <Infinite
          elementHeight={229}
          containerHeight={document.body.clientHeight - 100}
          onInfiniteLoad={this.handleInfiniteLoad}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          infiniteLoadBeginEdgeOffset={50}
          isInfiniteLoading={this.state.isInfiniteLoading}
        >
          {main}
        </Infinite>
        <Footer index={index} />
      </div>
    );
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.getNews({columnId: 784});
  }

  //todo 为了演示react-infinite的例子临时注释掉
  //shouldComponentUpdate(nextProps, nextState) {
  //  //判断新的状态是否与现有状态一致,如果一致,则返回false,阻止更新
  //  //该函数默认返回true
  //  return nextProps.state != this.props.state;
  //}

  elementInfiniteLoad() {
    return (
      <div>
        Loading...
      </div>
    );
  }

  handleInfiniteLoad() {
    console.log('handleInfiniteLoad');
    const me = this;
    const {actions} = me.props;
    me.setState({
      isInfiniteLoading: true
    });
    setTimeout(() => {
      actions.getNews({columnId: 784});
      me.setState({
        isInfiniteLoading: false
      });
    }, 2500);
  }
}

/*
 文章列表
 */
class Article extends Component {
  render() {
    const { article } = this.props;
    let {id, bookTitle, bookContent, bookClick, bookImg } = article;
    bookContent = `${bookContent.substring(0, 50)}...`;
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
        <Link to={`/ProductDetail/${bookTitle}`}>
          {images}
          <h3>{bookTitle}</h3>
          <div className="content">{bookContent}</div>

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
    actions: bindActionCreators({getNews}, dispatch)
  })
)(Index);