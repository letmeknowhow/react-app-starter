import React from 'react';
import { Table } from 'antd';

const TreeView = ({ rowKey, columns, data, onExpand, expandedRowKeys, loading }) => {
  const formatDataSource = (data) => {
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].children) {
          data[i].children = [];
        }
      }
      return data;
    }
  }
  return (
    <Table
      size="small"
      showHeader={false}
      bordered={false}
      pagination={false}
      columns={columns}
      loading={loading}
      dataSource={formatDataSource(data)}
      scroll={{ x: false, y: false }}
      rowKey={rowKey}
      onExpand={onExpand}
      expandedRowKeys={expandedRowKeys}
      locale={{emptyText: '无数据'}}
    />
  );
}

export default TreeView;