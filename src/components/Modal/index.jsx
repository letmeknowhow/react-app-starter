import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import omit from 'object.omit';
import confirm from './confirm';
import Modal from './Modal';

class KModal extends Component {
  static defaultProps = {
    visible: false,
  };

  static propTypes = {
    submitCB: PropTypes.func,
    cancelCB: PropTypes.func,
  };

  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext() {
    return { store: this.props.store };
  }

  state = {
    visible: this.props.visible,
    loading: false,
  }

  close = () => {
    this.setState({
      loading: false,
      visible: false,
    })
  }

  cancelLoad = () => {
    this.setState({
      loading: false,
    })
  }
  
  render() {
    const { visible, loading } = this.state;
    return visible ?
      <Modal visible={visible}
        maskClosable={false}
        width={this.props.width || 800}
        zIndex={1200}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        loading={loading}
        {...this.props}
      /> : null;
  }

  handleSubmit = () => {
    const { submitCB } = this.props;
    let submit = false;
    if(submitCB ){
      submit = submitCB();
    }
    if(submit === true) {
      this.setState({
        loading: true,
      })
    }
  }

  handleCancel = () => {
    const { cancelCB } = this.props;
    cancelCB && cancelCB();
    this.close();
  }
}

const openModal = function (props) {
  const node = document.createElement('div');
  document.body.appendChild(node);
  let refDom;
  props.visible = true;
  const children = props.content;
  const innerProps = omit(props, ['content']);
  ReactDom.render(
    <KModal ref={(node) => refDom = node} {...innerProps} store={Store} >
      {children}
    </KModal>,
    node);
  return refDom;
}

export {
  confirm,
  Modal,
  openModal
};

export default Modal;