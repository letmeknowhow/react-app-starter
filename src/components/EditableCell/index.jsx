/**
 * class: EditableCell
 * author: niuxiaoyu
 * description: 可编辑表格
 * date: 2018/5/9
 */

import React, { Component } from 'react'
import styles from './index.css';

import { Input, Icon } from 'antd';

export default class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }

  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  edit = () => {
    this.setState({ editable: true }, () => {
      this.input.focus();
    });
  }

  onBlur = () => {
    this.setState({
      editable: false
    })
  }

  render() {
    const { value: propValue } = this.props;
    const { value, editable } = this.state;
    return (
      <div
        className={styles["editable-cell"]}
        onBlur={this.onBlur}
      >
        {
          editable ?
            <div className={styles["editable-cell-input-wrapper"]}>
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
                ref={input => this.input = input}
              />
              {/* <Icon
                type="check"
                className={styles["editable-cell-icon-check"]}
                onClick={this.check}
              /> */}
            </div>
            :
            <div className={styles["editable-cell-text-wrapper"]}>
              {propValue || ' '}
              <Icon
                type="edit"
                className={styles["editable-cell-icon"]}
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}