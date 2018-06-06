/**
 * class: EditableCell - Custom
 * author: niuxiaoyu
 * description: 可编辑表格-只提供编辑按钮
 * date: 2018/5/9
 */

import React, { Component } from 'react'
import styles from './index.css';

import { Icon } from 'antd';

export default ({value, onEdit}) => {
  const edit = () => {
    if (onEdit) {
      onEdit(value);
    }
  };

  return (
    <div className={styles["editable-cell"]}>
      {
        <div className={styles["editable-cell-text-wrapper"]}>
          {value || ' '}
          <Icon
            type="edit"
            className={styles["editable-cell-icon"]}
            onClick={edit}
          />
        </div>
      }
    </div>
  );
}