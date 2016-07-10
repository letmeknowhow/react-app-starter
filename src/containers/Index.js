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
//import {Link} from 'react-router';

/*
 redux 相关
 */
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {getNews} from '../actions/news';

import ReactList from 'react-list';

/*
 公共react组件
 */
import {Header, Footer, Loading} from './../component/common/index';

/*
 相关的模块调用
 */

/*
 组件入口文件
 */
class Index extends Component {
  constructor(props) {
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  render() {
    const { state } = this.props;
    //let main = null;
    //if (Tool.isArray(state.list)) {
    //  main = (<ArticleList list={state.list} />);
    //}
    let index = 0;
    let leftTo = null;
    let leftIcon = null;


    return (
      <div>
        <Header leftTo={leftTo} leftIcon={leftIcon} title={'新闻列表'} />
        <ul>
          <ReactList
            itemRenderer={this.renderItem}
            length={state.list.length}
            type={'uniform'}
            useStaticSize={true}
            threshold={0}
          />
        </ul>
        <Footer index={index} />
      </div>
    );
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.getNews({columnId: 784});
  }

  shouldComponentUpdate(nextProps, nextState) {
    //判断新的状态是否与现有状态一致,如果一致,则返回false,阻止更新
    //该函数默认返回true
    return nextProps.state != this.props.state;
  }

  renderItem(index, key) {
    const { state } = this.props;
    return (
      <Article
        key={key}
        article={state.list[index]}
      />
    );
  }

  handleRefresh() {
    const {actions} = this.props;
    actions.getNews({columnId: 784});
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
        {images}
        <h3>{bookTitle}</h3>
        <div className="content">{bookContent}</div>

        <div className="bottom" data-flex="main:justify">
          <div className="click">阅读：{bookClick}</div>

        </div>
      </li>
    );
  }
}

export default connect(state =>
  ({ state: state.news }),
  (dispatch) => ({
    actions: bindActionCreators({getNews}, dispatch)
  })
)(Index);