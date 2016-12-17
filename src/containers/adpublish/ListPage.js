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
import GetNext from '../../lib/GetNext';

import {Header, Loading} from '../../component/common/index';
import '../../css/ListPage.less';

import {getADList, startLoading} from '../../actions/adpublish/home';

//行高
const ROW_HEIGHT = 70;

const PAGE_ID = 'ADList';

class ListPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state: { list, loadMsg, loadState } } = this.props;
    console.log('loadState: ' + loadState);
    console.log(list.length);
    if (loadState != 0) this.loading = false;
    const adList = list.map((item, index) => {
      return (<ADItem key={index} index={index} productItem={item} />);
    });
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
        <ul>
          {adList}
        </ul>
        <div ref="dataload"><Loading loadState={loadState} loadMsg={loadMsg} /></div>
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
    //if (state.list.length > 0) {
    //  return;
    //} else {
    //  actions.getADList(PAGE_ID);
    //}

    this.getNext = new GetNext(this.refs.dataload, {
      getNextData: (el) => { //开始加载
        if (this.loading) return;
        this.loading = true;
        actions.startLoading();
        actions.getADList();
      }
    });
  }

  componentWillUnmount() {
    if (this.getNext) this.getNext.end();
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
    actions: bindActionCreators({getADList, startLoading}, dispatch)
  })
)(ListPage);