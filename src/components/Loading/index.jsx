/**
 * class: Loading
 * author: niuxiaoyu
 * description: 
 * date: 2018/05/10
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import styles from './index.css';

class Loading extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  };
  
  static defaultProps = {
    size: 'default',
    delay: 200,
  };

  constructor(props) {
    super(props);

    const { loading } = props;
    this.state = {
      loading
    };
  }

  componentWillUnmount() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const currentLoading = this.props.loading;
    const loading = nextProps.loading;
    const { delay } = this.props;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (currentLoading && !loading) {
      this.debounceTimeout = window.setTimeout(() => this.setState({ loading }), 200);
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
    } else {
      if (loading && delay && !isNaN(Number(delay))) {
        if (this.delayTimeout) {
          clearTimeout(this.delayTimeout);
        }
        this.delayTimeout = window.setTimeout(() => this.setState({ loading }), delay);
      } else {
        this.setState({ loading });
      }
    }
  }

  //是否是内联模式，loading组件包在需要loading的组件外面；否则就是内嵌模式
  isNestedPattern() {
    return !!(this.props && this.props.children);
  }

  getLoadingElement() {
    const { size = 'default', type = '', style = {} } = this.props;
    let cls = `size-${size}`;
    if (type == 'table') {//table的loading位置与其他不同，因为如果垂直居中的话，太靠下了……
      cls += '-table';
    }
    if (!this.isNestedPattern()) {//非内联模式，样式名称需要加一个“-noNested”
      cls += '-noNested';
    }
    return (<div className={styles[cls]} style={style}></div>)
  }

  render() {
    const { loading } = this.state;
    const { children = '' } = this.props;
    const loadingElement = this.getLoadingElement();
    return (
      this.isNestedPattern() ?
        <div>
          {loading && <div className={styles["loading"]}>{loadingElement}</div>}
          <div className={loading ? styles['loading-wrapper'] : ''} key="container">
            {children}
          </div>
        </div> :
        <div>
          {loading && <div className={styles["loading-tip"]}>{loadingElement}</div>}
        </div>
    )
  }
}

export default Loading;
