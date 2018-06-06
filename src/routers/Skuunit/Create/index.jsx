/**
 * author: niuxiaoyu
 * description: 新建单元
 * date: 2018/6/6
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import {
  getSkuSetInfoList,
} from 'modules/skuunit/skuunit';
import {
  createNewOne,
} from 'modules/skuunit/newSkuunit';
import commonStyles from '../../index.css';

@connect(
  state => ({ newSkuunit: state.newSkuunit }),
  dispatch => bindActionCreators({
    getSkuSetInfoList,
    createNewOne,
  }, dispatch)
)
class Create extends Component {
  state = {
    submitting: false
  }
  componentDidMount() {
    this.getInitialData();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.newSkuunit.drawerIsOpening != nextProps.newSkuunit.drawerIsOpening
      && false == nextProps.newSkuunit.drawerIsOpening
    ) {
      this.setState({
        submitting: false
      });
      this.props.closeDrawer();
    }
  }

  render() {
    const { skusetList } = this.props.newSkuunit;
    const { submitting } = this.state;
    return (
      <div >
        <h1 className={commonStyles['coverage-title']}>新建单元</h1>
        {skusetList.map((item, index) => <div key={index}>{item.skuSetName}</div>)}
        <div className="mt15">
          <Button
            className='mr10'
            type="primary"
            onClick={this.onSubmit}
            loading={submitting}
          >提交</Button>
          <Button
            type="minor"
            onClick={this.props.closeDrawer}
          >取消</Button>
        </div>
      </div>
    )
  }

  getInitialData = () => {
    this.props.getSkuSetInfoList();
  }

  onSubmit = () => {
    this.setState({
      submitting: true,
    });
    this.props.createNewOne('1', '2');
    // this.props.closeDrawer && this.props.closeDrawer()
  }
}

export default Create;
