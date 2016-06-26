/**
 * 主页
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
import newslistActions from '../action/newslistActions';

/*
 公共react组件
 */
import {Header, Footer, Loading} from './common/index';

/*
 相关的模块调用
 */
import Tool from '../lib/Tool/Tool';
import GetNext from '../lib/GetNext/GetNext';
/*
 组件入口文件
 */
class Index extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { state } = this.props;
    let main = null;
    if (Tool.isArray(state.list)) {
      main = (<ArticleList list={state.list}/>);
    }
    let index = 0;
    let leftTo = null;
    let leftIcon = null;


    return (
      <div>
        <Header leftTo={leftTo} leftIcon={leftIcon} title={'新闻列表'}/>
        {main}
        <Footer index={index}/>
      </div>
    );
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.getNews({columnId:784});
  }

  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }
}

/*
 文章列表
 */
export class ArticleList extends Component {
  render() {
    return (
      <ul className="article-list">
        {
          this.props.list.map((item, index) => {
            let {id, book_title, book_content, book_click, book_img} = item;
            book_content = book_content.substring(0, 50) + '...';
            let images = null;
            if (/^http/.test(book_img)) {
              images = (
                <div className="pictrue"><img src={book_img}/></div>
              );
            } else {
              images = (
                <div className="pictrue"><img src={book_img}/></div>
              );
            }

            return (
              <li key={index}>

                  {images}
                  <h3>{book_title}</h3>
                  <div className="content">{book_content}</div>

                <div className="bottom" data-flex="main:justify">
                  <div className="click">阅读：{book_click}</div>

                </div>
              </li>
            )
          })
        }
      </ul>
    );
  }
}

export default connect(state => ({
    state: state.newslistReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(newslistActions, dispatch)
  })
)(Index);
//export default connect((state) => { return { state: state.classNewList }; }, action('classNewList'))(Index); //连接redux