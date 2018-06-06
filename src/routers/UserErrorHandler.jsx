/**
 * author: niuxiaoyu
 * description: 用于显示错误信息
 * date: 2018/6/6
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'antd';

import { removeError } from 'modules/common/userErrorHandler';

@connect(
  state => ({ userError: state.userErrorHandler }),
  dispatch => bindActionCreators({
    removeError,
  }, dispatch)
)
class UserErrorHandler extends Component {
  componentWillReceiveProps(nextProps) {
    const {error} = nextProps.userError;
    if(error) {
      alert(error, 'error')
    }
  }

  render() {
    return null;
  }
}

export default UserErrorHandler;
