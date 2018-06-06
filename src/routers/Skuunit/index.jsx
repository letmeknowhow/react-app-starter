/**
 * author: niuxiaoyu
 * description: 单元
 * date: 2018/6/6
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Button, Input, Table, Select } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  showSkuunitList,
  modiSkuUnitName,
  updateSkuUnitPause,
  deleteSkuUnit,
  getSkuSetInfoList,
  updateSkuUnitRelation,
  showModalDialog,
} from 'modules/skuunit/skuunit';

import { 
  openDrawer, 
} from 'modules/skuunit/newSkuunit';

import {
  CreateDrawer,
  Pages,
  EditableCell,
  Loading,
  openModal,
} from 'component';

import CustomEditableCell from 'component/EditableCell/Custom';
import Create from './Create';
import ScopeSelection from './ScopeSelection';
import commonStyles from '../index.css';

const Option = Select.Option

@connect(
  state => ({ skuunit: state.skuunit }),
  dispatch => bindActionCreators({
    showSkuunitList,
    modiSkuUnitName,
    updateSkuUnitPause,
    deleteSkuUnit,
    getSkuSetInfoList,
    updateSkuUnitRelation,
    showModalDialog,
    openDrawer,
  }, dispatch)
)
class Skuunit extends Component {

  constructor(props) {
    super(props);
    const me = this;
    this.state = {
      skuUnitState: -1,
      skuUnitName: '',
      selectedRowKeys: []
    }
    this.openDrawer = CreateDrawer(Create).openDrawer;
    this.queryParams = this.getDefaultQueryParams();
    this.modalDialog = null;
  }

  COLUMNS = [
    {
      title: '名称（点击编辑按钮修改）',
      dataIndex: 'skuUnitName',
      width: 230,
      key: 'skuUnitName',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.skuUnitId, 'skuUnitName')}
        />
      ),
    },
    {
      title: '状态',
      dataIndex: 'isPause',
      key: 'isPause',
      width: 100,
      filters: [
        { text: '启用', value: 0 },
        { text: '暂停', value: 1 },
      ],
      onFilter: (value, record) => record.isPause == value,
      render: (text, record) => (
        text == 0 ?
          <span>启用
            <i
              className="iconfont icon-zanting fr color-green edit-cursor"
              href="javascript:;"
              onClick={this.changeSingleUnitState(record.skuUnitId, record.skuUnitName, false)}
            />
          </span> :
          <span>暂停
            <i
              className="iconfont icon-zhengchang fr color-orange edit-cursor"
              href="javascript:;"
              onClick={this.changeSingleUnitState(record.skuUnitId, record.skuUnitName, true)}
            />
          </span>
      ),
    },
    {
      title: '点击编辑按钮显示modal',
      key: 'scope',
      render: (text, record) => (
        <CustomEditableCell
          value={<span>{`${record.planCount}个父级`}<br />{`${record.groupCount}个子级`}</span>}
          onEdit={this.onScopeEdit(record.skuUnitId)}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={this.deleteSingleUnit(record.skuUnitId, record.skuUnitName)}>删除</a>
        </span>
      ),
    }
  ];

  componentDidMount() {
    this.loadTable();

    //提前获取集合列表
    this.props.getSkuSetInfoList();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.skuunit.showModal != nextProps.skuunit.showModal && false == nextProps.skuunit.showModal) {
      this.modalDialog.close();
    }
  }


  render() {
    const { skuunit: { skuunitList, ajaxpc, isLoading } } = this.props;
    const { selectedRowKeys } = this.state;
    const pageProps = {
      pageSize: ajaxpc ? ajaxpc.pageSize : 20,
      total: ajaxpc ? ajaxpc.recordCount : 0,
      current: ajaxpc ? ajaxpc.pageNo : 1,
      loadTable: this.loadTable,
      pageSizeOptions: ['100']
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <div className={commonStyles['main-layout']}>
        <Loading loading={isLoading} type='table' >
          <div className={commonStyles['condition-box']}>
            <div className={commonStyles['condition-list']}>
              <span className={commonStyles['condition-label']}><Button type="minor" onClick={this.showDrawer}>新建单元</Button></span>
              <span className={commonStyles['condition-label']}><Button type="minor" onClick={this.enableUnits}>启用</Button></span>
              <span className={commonStyles['condition-label']}><Button type="minor" onClick={this.disableUnits}>暂停</Button></span>
              <span className={commonStyles['condition-label']}><Button type="minor" onClick={this.deleteSkuunits}>删除</Button></span>
            </div>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={this.COLUMNS}
            dataSource={skuunitList}
            bordered={true}
            pagination={false}
            rowKey="skuUnitId"
          />
          <Pages {...pageProps} />
        </Loading>
      </div>
    );
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  getDefaultQueryParams = () => {
    return {
      filter: {
        skuUnitState: '-1',
        skuUnitName: '',
      },
      page: {
        pageNo: 1,
        pageSize: 100,
      },
      table: {}
    };
  }
  

  loadTable = (key, params, shouldReset) => {
    if (key) {
      this.setQueryParams(key, params, shouldReset);
    }
    this.props.showSkuunitList(this.formatQueryParams());
  }

  setQueryParams = (key, values, shouldReset) => {
    if (shouldReset) {
      this.resetQueryParams();
    }
    Object.assign(this.queryParams[key], { ...values });
  }

  resetQueryParams = (key, params) => {
    this.queryParams = this.getDefaultQueryParams();
  }

  formatQueryParams = () => {
    const params = this.queryParams;
    const res = {};
    for (let p in params) {
      if ({}.hasOwnProperty.call(params, p)) {
        Object.assign(res, params[p]);
      }
    }
    return res;
  }

  showDrawer = () => {
    this.props.openDrawer();
    this.openDrawer();
  }

  findList = () => {
    this.loadTable('filter', this.state, true);
  }

  onCellChange = (key, dataIndex) => {
    const me = this;
    return (value) => {
      me.props.modiSkuUnitName(key, value);
    };
  }

  onScopeEdit = (unitId) => {
    return () => {
      let scopeSelectionInstance;
      const submitChangeScope = () => {
        if (!scopeSelectionInstance) return;
        const { right } = scopeSelectionInstance.getSelection();
        if (!right || right.length == 0) {
          alert('请选择父级/子级');
          return;
        }
        const plans = [];
        const groups = [];
        for (let i = 0; i < right.length; i++) {
          if (right[i].children.length == 0) {
            plans.push(right[i].id);
          } else {
            for (let j = 0; j < right[i].children.length; j++) {
              groups.push(right[i].children[j].id);
            }
          }
        }
        this.props.updateSkuUnitRelation(unitId, plans, groups)
        return true;
      }
      const cfg = {
        title: '修改投放范围',
        width: 800,
        content: <ScopeSelection
          getInstance={(ins) => scopeSelectionInstance = ins}
          unitId={unitId}
        />,
        submitCB: submitChangeScope
      }
      this.modalDialog = this.wrapOpenModal(cfg);
    };
  }

  changeSingleUnitState = (unitId, unitName, enable) => {
    return () => {
      confirm(`${enable ? '启用' : '暂停'}“${unitName}”？`, () => {
        this.changeUnitState([unitId], enable);
      })
    }
  }

  enableUnits = () => {
    if (this.state.selectedRowKeys.length == 0) {
      alert('请选择单元');
      return;
    }
    confirm('启用选中的单元？', () => {
      this.changeUnitState(this.state.selectedRowKeys, true);
    })
  }

  disableUnits = () => {
    if (this.state.selectedRowKeys.length == 0) {
      alert('请选择单元');
      return;
    }
    confirm('暂停选中的单元？', () => {
      this.changeUnitState(this.state.selectedRowKeys, false);
    })
  }

  changeUnitState = (unitIds, enable) => {
    if (!unitIds || unitIds.length == 0) return;
    this.props.updateSkuUnitPause(unitIds, !enable);
  }

  deleteSingleUnit = (unitId, unitName) => {
    return () => {
      confirm(`删除单元：${unitName} ？`, () => {
        this.props.deleteSkuUnit([unitId]);
      })
    }
  }

  deleteSkuunits = () => {
    if (this.state.selectedRowKeys.length == 0) {
      alert('请选择单元');
      return;
    }
    confirm('删除选中的单元？', () => {
      this.props.deleteSkuUnit(this.state.selectedRowKeys);
    })
  }

  wrapOpenModal = (cfg) => {
    this.props.showModalDialog();
    return openModal(cfg);
  }
}

export default Skuunit