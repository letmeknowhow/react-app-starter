/**
 * class: Modal
 * author: niuxiaoyu
 * description: 改写antd Modal的默认footer, 调整确认取消按钮的前后顺序
 * date: 2017/01/24
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Modal, Button } from 'antd';
import omit from 'object.omit';
const BizModal = (props) => {
  let innerProps;
  const handleOk = (e) => {
    const onOk = props.onOk;
    if(onOk) {
      onOk(e);
    }
  }
  const handleCancel = (e) => {
    const onCancel = props.onCancel;
    if(onCancel) {
      onCancel(e);
    }
  }
  const renderFooter = () => {
    return (
      <div>
        <Button type="primary" onClick={handleOk} loading={props.loading}>
          确定
        </Button>
        <Button onClick={handleCancel}>
          取消
        </Button>
      </div>
    )
  }

  if(props && !props.footer && (props.onOk || props.onCancel)) {
    const footer = renderFooter();
    //onCancel留给关闭按钮用
    innerProps = omit(props, ['onOk']);
    Object.assign(innerProps, {footer});
  } else {
    innerProps = props;
  }

  return (
    <Modal {...innerProps} />
  )
}

BizModal.propTypes = {
  loading: PropTypes.bool
};

BizModal.defaultProps = {
  loading: false
};

export default BizModal;