/**
 * class: Confirm dialog
 * author: niuxiaoyu
 * description: 确认对话框——由于antd的Modal.confirm的按钮顺序不符合旭日要求，重写了antd的confirm
 * date: 2017/01/24
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon, Modal as Dialog } from 'antd';

const ConfirmDialog = (props) => {
  const { onCancel, onOk, close, zIndex, afterClose, visible } = props;
  const iconType = props.iconType || 'question-circle';
  const okType = props.okType || 'primary';
  const prefixCls = props.prefixCls || 'ant-confirm';
  // 默认为 true，保持向下兼容
  const okCancel = ('okCancel' in props) ? props.okCancel : true;
  const width = props.width || 416;
  const style = props.style || {};
  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
  const okText = props.okText || '确定';
  const cancelText = props.cancelText || '取消';

  const cancelButton = okCancel && (
    <ActionButton actionFn={onCancel} closeModal={close}>
      {cancelText}
    </ActionButton>
  );

  return (
    <Dialog
      className="ant-modal ant-confirm ant-confirm-confirm"
      onCancel={close.bind(this, { triggerCancel: true })}
      visible={visible}
      title=""
      transitionName="zoom"
      footer=""
      maskTransitionName="fade"
      maskClosable={maskClosable}
      style={style}
      width={width}
      zIndex={zIndex}
      afterClose={afterClose}
    >
      <div className={`${prefixCls}-body-wrapper`}>
        <div className={`${prefixCls}-body`}>
          <Icon type={iconType} />
          <span className={`${prefixCls}-title`}>{props.title}</span>
          <div className={`${prefixCls}-content`}>{props.content}</div>
        </div>
        <div className={`${prefixCls}-btns`}>
          <ActionButton type={okType} actionFn={onOk} closeModal={close} autoFocus>
            {okText}
          </ActionButton>
          {cancelButton}
        </div>
      </div>
    </Dialog>
  );
};

export default function confirm(config) {
  let div = document.createElement('div');
  document.body.appendChild(div);

  function close(...args) {
    destroy(...args);
  }

  function destroy(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args && args.length &&
      args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
  }

  function render(props) {
    ReactDOM.render(<ConfirmDialog {...props} />, div);
  }

  render({ ...config, visible: true, close });

  return {
    destroy: close,
  };
}

class ActionButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onClick = () => {
    const { actionFn, closeModal } = this.props;
    if (actionFn) {
      let ret;
      if (actionFn.length) {
        ret = actionFn(closeModal);
      } else {
        ret = actionFn();
        if (!ret) {
          closeModal();
        }
      }
      if (ret && ret.then) {
        this.setState({ loading: true });
        ret.then((...args) => {
          closeModal(...args);
        }, () => {
          this.setState({ loading: false });
        });
      }
    } else {
      closeModal();
    }
  }

  render() {
    const { type, children } = this.props;
    const loading = this.state.loading;
    return (
      <Button type={type} onClick={this.onClick} loading={loading}>
        {children}
      </Button>
    );
  }
}