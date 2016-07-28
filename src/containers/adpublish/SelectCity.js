/**
 *  Class: selectCity
 *  Author: lvpeipei
 *  Date: 2016/7/13.
 *  Description:出发地 目的选择
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {changePlace} from '../../actions/adpublish/place';
import {Header} from '../../component/common/index';
import { CONST_CITYLIST_START, CITYDATA_START, CONST_CITYLIST_DES, CITYDATA_DES } from './AddressListData';
import WeUI from 'react-weui';
import 'weui';
const { SearchBar, Panel, PanelBody, MediaBox } = WeUI;
import '../../css/selectCity.less';

let leftTo = null;
let leftIcon = 'fanhui';
class CityItem extends Component {
  constructor(props) {
    super(props);
    this.changeHandle = this.changeHandle.bind(this);
  }
  render() {
    return (
      <li onClick={this.changeHandle}>{this.props.cityName.cityName}</li>
    );
  }
  changeHandle() {
    this.props.selectHandle(this.props.cityName.cityName);
  }
}
class CityList extends Component {
  render() {
    return (
      <div className="clearfix">
        <div className="area-lit">{this.props.item.areaName}</div>
        <ul className="city-list">
          {
            this.props.item.cityList.map((city, index) => { return (<CityItem key={index} cityName={city} selectHandle={this.props.selectHandle} />); })
          }
        </ul>
      </div>
    );
  }
}
class SelectCity extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      searchText: '',
      results: []
    };
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }

  componentWillMount() {
    const {key, pageID} = this.parseParam(this.props.params.placeType);
    this.placeTag = key;
    this.pageID = pageID;
    if (key === 'start') {
      this.placeData = CITYDATA_START;
      this.placeList = CONST_CITYLIST_START;
    } else {
      this.placeData = CITYDATA_DES;
      this.placeList = CONST_CITYLIST_DES;
    }
  }

  render() {
    let main = this.placeData.map((article, index) => {
      return (
        <CityList
          key={index}
          item={article}
          selectHandle={this.handleSelected}
        />
      );
    });
    return (
      <div className="city-bg">
        <Header leftTo={leftTo} leftIcon={leftIcon} title={'出发地选择'} />
        <SearchBar
          onChange={this.handleSearchBarChange}
        />
        <Panel access style={{display: this.state.searchText ? null : 'none', marginTop: 0}}>
          <PanelBody>
            {
              this.state.results.length > 0 ?
                this.state.results.map((item, i) => {
                  return (
                    <MediaBox key={i} type="appmsg" onClick={() => this.handleSelected(item)}>
                      {item}
                    </MediaBox>
                  );
                })
                : <MediaBox>找不到了！</MediaBox>
            }
          </PanelBody>
        </Panel>
        <div className="area-box">
          {main}
        </div>
      </div>
    );
  }

  handleSearchBarChange(text) {
    let keywords = [text];
    let results = this.placeList.filter(/./.test.bind(new RegExp(keywords.join('|'), 'i')));

    if (results.length > 3) {
      results = results.slice(0, 3);
    }
    this.setState({
      results,
      searchText: text,
    });
  }

  handleSelected(selected) {
    const {actions} = this.props;
    actions.changePlace({key: this.placeTag, selected}, this.pageID);
    this.context.router.goBack();
  }

  parseParam(p) {
    let {key, pageID} = {};
    const data = p.split(';');
    if (data && data.length === 2) {
      key = data[0];
      pageID = data[1];
    }
    return {key, pageID};
  }
}

SelectCity.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(state => ({state: state.sample}),
  (dispatch) => ({
    actions: bindActionCreators({changePlace}, dispatch)
  })
)(SelectCity);
