/**
 *  Class: DateSelector
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

class DateSelector extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
    this.dateSelectedCallback = this.dateSelectedCallback.bind(this);
  }

  dateSelectedCallback(e, day, { selected, disabled }) {
    console.log(this.props.params.selected);
    const d = day.Format('yyyy-MM-dd');
    console.log(d);
    const {actions} = this.props;
    actions.changeDate(d);
    //this.context.router.push(`/Menu/${day.Format('yyyy-MM-dd')}`);
    this.context.router.push('/Menu');
  }

  // 渲染
  render() {
    const selected = this.props.params.selected;
    return (
      <div>
        <Header leftIcon="fanhui" title={'选择日期'} />
        <Calendar selected={selected} selectedCallback={this.dateSelectedCallback} />
      </div>
    );
  }
}

DateSelector.contextTypes = {
  router: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
};

export default connect(state =>
    ({state: state.selected}),
  (dispatch) => ({
    actions: bindActionCreators({changeDate}, dispatch)
  })
)(DateSelector);