/**
 *  Class: DateRangeSelector
 *  Author: Niu Xiaoyu
 *  Date: 16/7/12.
 *  Description: 日历
 */
import React, { Component } from 'react';

/*
 redux 相关
 */
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeDate} from '../actions/calendar';

import Calendar from '../component/Calendar';
import {Header} from './../component/common/index';

class DateRangeSelector extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
    this.dateSelectedCallback = this.dateSelectedCallback.bind(this);
  }

  dateSelectedCallback(e, day, { selected, disabled }) {
    console.log(this.props.params.selected);
    const {key} = this.parseParam(this.props.params.selected);
    const {actions} = this.props;
    actions.changeDate({key, selected: day.Format('yyyy-MM-dd')});
    //this.context.router.push(`/Menu/${day.Format('yyyy-MM-dd')}`);
    this.context.router.goBack();
  }

  // 渲染
  render() {
    const {selectedDate} = this.parseParam(this.props.params.selected);
    return (
      <div>
        <Header leftIcon="fanhui" title={'选择日期'} />
        <Calendar selected={selectedDate} selectedCallback={this.dateSelectedCallback} />
      </div>
    );
  }

  parseParam(p) {
    const arr = p.split('=');
    return {key: arr[0], selectedDate: arr[1]};
  }
}

DateRangeSelector.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(state => ({state: state.sample}),
  (dispatch) => ({
    actions: bindActionCreators({changeDate}, dispatch)
  })
)(DateRangeSelector);