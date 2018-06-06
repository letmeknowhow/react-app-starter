/**
 * class: SelectBox
 * author: niuxiaoyu
 * description: 支持单层树状结构的选择箱
 * date: 2018/5/22
 */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { Input } from 'antd';
import styles from './index.css';
import TreeView from './TreeView';

const Search = Input.Search;

class SelectBox extends Component {
  static propTypes = {
    childrenLoadUrl: PropTypes.string.isRequired,
    disabledPropsKey: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    loadingL: PropTypes.bool,
    loadingR: PropTypes.bool,
  };

  static defaultProps = {
    disabledPropsKey: 'isSelected',
    height: 500,
    loadingL: false,
    loadingR: false,
  };

  constructor(props) {
    super(props);
    let childCount = 0;
    for (let i = 0; i < props.dataSourceL.length; i++) {
      const p = props.dataSourceL[i];
      childCount += p.childAmount;
    }

    this.state = {
      left: [...props.dataSourceL],
      right: [...props.dataSourceR],
      expandKeysL: [],
      expandKeysR: [],
      loadingL: props.loadingL,
      loadingR: props.loadingR,
      totalCount: childCount,
      filterKey: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      dataSourceL,
      dataSourceR,
      loadingL,
      loadingR
    } = nextProps;
    if (dataSourceL.length != this.props.dataSourceL) {
      this.setState({
        left: dataSourceL
      })
    }
    if (dataSourceR.length != this.props.dataSourceR) {
      this.setState({
        right: dataSourceR
      })
    }
    if (loadingL != this.props.loadingL) {
      this.setState({
        loadingL
      })
    }
    if (loadingR != this.props.loadingR) {
      this.setState({
        loadingR
      })
    }
  }


  /**
   * 初始化列
   */
  _initColumns = () => {
    if (this.props.columns && this.props.columns.length > 0) {
      return columns;
    }
    return [{
      dataIndex: 'name',
      key: 'name',
    }];
  }

  /**
  * 初始化左侧列
  */
  _initLeftColumn = () => {
    let columns = [
      ...this._initColumns(),
      {
        dataIndex: 'childAmount',
        key: 'childAmount',
        width: 100,
        render: (text) => text && <span>({text})</span>
      },
      {
        dataIndex: '',
        key: 'op',
        width: 40,
        render: (text, record) => {
          let clsName = 'btnSelect';
          if (record[this.props.disabledPropsKey]) {
            clsName = 'btnSelectDisabled';
          }
          return (<a className={styles[clsName]} href="javascript:;">添加</a>);
        },
        onCell: this._handleOnCellLeft
      }
    ];
    return columns;
  }

  /**
  * 初始化右侧列
  */
  _initRightColumn = () => {
    let columns = [
      ...this._initColumns(),
      {
        dataIndex: 'selectedChildCount',
        key: 'selectedChildCount',
        width: 100,
        render: (text) => text && <span>({text})</span>
      },
      {
        dataIndex: '',
        key: 'op',
        width: 40,
        render: () => <a className={styles['btnSelect']} href="javascript:;">删除</a>,
        onCell: this._handleOnCellRight
      }
    ]
    return columns;
  }

  _handleOnCellLeft = (record) => {
    return {
      onClick: (e) => {
        if (record[this.props.disabledPropsKey]) {
          return;
        }
        this._onTransferToR(record);
      }
    }
  }

  _handleOnCellRight = (record, event) => {
    return {
      onClick: (e) => {
        this._onTransferToL(record);
      }
    }
  }

  /**
   * 选中节点
   */
  _onTransferToR = (record) => {
    let res;
    //选中父级
    if (record.children) {
      res = this._parentSelected(record);

    }
    //选中子级
    else {
      res = this._childSelected(record);
    }
    const newRight = this._massageSelectedData(res.newRight);
    this.setState({
      left: res.newLeft,
      right: newRight,
    })
  }

  /**
   * 取消选中节点
   */
  _onTransferToL = (record) => {
    let res;
    //取消父级
    if (record.children) {
      res = this._parentCanceled(record);

    }
    //取消子级
    else {
      res = this._childCanceled(record);
    }
    const newRight = this._massageSelectedData(res.newRight);
    this.setState({
      left: res.newLeft,
      right: newRight,
    })
  }

  /**
   * 选中父节点
   */
  _parentSelected = (record) => {
    let isSelectedPar = false;
    const newNode = Object.assign({}, record);

    //将选中节点下所有子节点的选中标记置为true
    for (let i = 0; i < record.children.length; i++) {
      record.children[i][this.props.disabledPropsKey] = true;
    }
    //将该节点选中标记置为true
    record[this.props.disabledPropsKey] = true;

    //生成新的左侧树数据源
    const newLeft = this.state.left.map(item => {
      if (item.id == record.id) return record;
      return item;
    })

    //生成新的右侧树数据源
    const newRight = [...this.state.right];
    //判断该父节点是否已经存在
    for (let i = 0; i < newRight.length; i++) {
      if (newRight[i].id == record.id) {
        isSelectedPar = true;
        newRight[i] = newNode;
        break;
      }
    }
    //如果右侧不存在该节点
    if (!isSelectedPar) {
      newRight.push(newNode);
    }
    return { newLeft, newRight };
  }

  /**
   * 取消父节点选中状态
   */
  _parentCanceled = (record) => {
    //step1 更新左侧树选中标记
    const newLeft = this.state.left.map((item) => {
      if (item.id == record.id) {
        item[this.props.disabledPropsKey] = false;
        for (let i = 0; i < item.children.length; i++) {
          item.children[i][this.props.disabledPropsKey] = false;
        }
      }
      return item;
    });
    //step2 删除右侧树中该节点
    const newRight = [];
    for (let i = 0; i < this.state.right.length; i++) {
      const p = this.state.right[i];
      if (p.id !== record.id) {
        newRight.push(p);
      }
    }
    return { newLeft, newRight };
  }

  /**
   * 选中子节点
   */
  _childSelected = (record) => {
    const { left, right } = this.state;
    //遍历左侧树，查找节点
    let { selectP, selectC } = this._massageDataSource(record, true);
    if (!selectP || !selectC) {
      return { newLeft: left, newRight: right };
    }
    //将节点插入右侧树
    let newP = right && right.find((item) => item.id === selectP.id);
    if (newP) {
      //右侧已经存在父级节点
      newP.children.push(selectC);
    } else {
      //右侧不存在父级节点
      newP = Object.assign({}, selectP);
      newP.children = [selectC];
      right.push(newP);
    }
    const newLeft = [...left];
    const newRight = [...right];
    return { newLeft, newRight };
  }

  /**
   * 取消选中子节点
   */
  _childCanceled = (record) => {
    const { left, right } = this.state;
    //遍历左侧树，查找节点
    let { selectP, selectC } = this._massageDataSource(record, false);
    if (!selectP || !selectC) {
      return { newLeft: left, newRight: right };
    }
    //处理右侧数据源
    const newRight = [];
    for (let i = 0; i < right.length; i++) {
      const p = right[i];
      if (p.id == selectP.id) {
        const arr = [];
        for (let j = 0; j < p.children.length; j++) {
          const c = p.children[j];
          if (c.id != selectC.id) {
            arr.push(c);
          }
        }
        if (arr.length != 0) {
          p.children = arr;
          newRight.push(p);
        }
      } else {
        newRight.push(p);
      }
    }

    const newLeft = [...left];
    return { newLeft, newRight };
  }

  /**
   * 根据选中（取消选中）节点操作，查找并整理数据源节点状态
   * 返回操作的父子节点
   */
  _massageDataSource = (record, doSelect) => {
    const source = this.state.left;
    let selectP, selectC;
    for (let i = 0; i < source.length; i++) {
      const p = source[i];
      let selectedCount = 0;
      for (let j = 0; j < p.children.length; j++) {
        const c = p.children[j];
        if (c.id == record.id) {
          c[this.props.disabledPropsKey] = doSelect;
          selectP = p;
          selectC = c;
        }
        if (c[this.props.disabledPropsKey]) {
          selectedCount += 1;
        }
      }
      if (selectedCount != 0 && selectedCount == p.children.length) {
        p[this.props.disabledPropsKey] = true;
      } else {
        p[this.props.disabledPropsKey] = false;
      }
      //找到节点，退出循环
      if (selectP) break;
    }
    return { selectP, selectC };
  }

  /**
   * 计算每个父节点下选中多少子节点
   * 为右侧树父节点增加属性“selectedChildCount”，用来显示选中子节点数
   */
  _massageSelectedData = (source) => {
    if (!source) return [];
    const res = [...source];
    for (let i = 0; i < res.length; i++) {
      const p = res[i];
      if (p.children.length == 0) {
        p.selectedChildCount = p.childAmount;
      } else {
        let n = 0;
        for (let j = 0; j < p.children.length; j++) {
          n++;
        }
        p.selectedChildCount = n;
      }
    }
    return res;
  }

  /**
   * 展开左侧树节点
   */
  _handleExpandL = (expanded, record) => {
    this._onExpand(expanded, record, 'expandKeysL');
    if (!expanded || record.children.length > 0) return;
    const cb = (grps) => {
      const newLeft = this._appendGroupToPlan(this.state.left, grps, record.id, true);
      this.setState({
        left: newLeft,
      })
    };
    this._fetch(record.id, 'left', cb);
  }

  /**
   * 展开右侧树节点
   */
  _handleExpandR = (expanded, record) => {
    this._onExpand(expanded, record, 'expandKeysR');
    const leftRecord = this.state.left.find(r => r.id == record.id);
    //以下状态时，函数直接退出。
    //1.关闭状态
    //2.被点击的右侧树父节点的子节点数大于0，并且相对应的左侧树该节点的子节点数也大于0
    if (!expanded || (record.children.length > 0 && leftRecord && leftRecord.children.length > 0)) return;
    const cb = (grps) => {
      //更新左侧树
      const newLeft = this._appendGroupToPlan(this.state.left, grps, record.id, true);
      let newRight = [...this.state.right];
      //如果右侧树节点下无子节点，更新右侧树
      if (record.children.length == 0) {
        newRight = this._appendGroupToPlan(this.state.right, grps, record.id);
      }
      this.setState({
        left: newLeft,
        right: newRight,
      })
    };
    this._fetch(record.id, 'right', cb);
  }

  /**
   * 全部选中
   */
  _transferAllToRight = () => {
    const newLeft = [...this.state.left];
    const newRight = this._massageSelectedData(this.state.left);
    for (let i = 0; i < newLeft.length; i++) {
      const p = newLeft[i];
      p[this.props.disabledPropsKey] = true;
      for (let j = 0; j < p.children.length; j++) {
        p.children[j][this.props.disabledPropsKey] = true;
      }
    }
    this.setState({
      left: newLeft,
      right: newRight
    });
  }

  /**
   * 全部取消选中
   */
  _transferAllToLeft = () => {
    const newLeft = [...this.state.left];
    const newRight = [];
    for (let i = 0; i < newLeft.length; i++) {
      const p = newLeft[i];
      p[this.props.disabledPropsKey] = false;
      for (let j = 0; j < p.children.length; j++) {
        p.children[j][this.props.disabledPropsKey] = false;
      }
    }
    this.setState({
      left: newLeft,
      right: newRight
    });
  }

  /**
   * 组建中节点展开采用受控方式，此处控制展开状态数组
   */
  _onExpand = (expanded, record, expandKeyName) => {
    const { rowKey: key = 'id' } = this.props;
    const expandKeys = this.state[expandKeyName] || []
    if (expanded) {
      expandKeys.push(record[key]);
    } else {
      expandKeys.splice(expandKeys.findIndex(item => item == record[key]), 1);
    }
    this.setState({
      [expandKeyName]: expandKeys
    })
  }

  /**
   * 展开节点时查询子节点
   */
  _fetch = (planId, leftOrRight, cb) => {
    const stateLoading = leftOrRight == 'left' ? 'loadingL' : 'loadingR';
    this.setState({ [stateLoading]: true });

    axios({
      url: this.props.childrenLoadUrl,
      method: 'get',
      params: { planId }
    }).then((data) => {
      const grps = data.data.data[0].children;
      // const newLeft = this._appendGroupToPlan(this.state.left, grps, planId, true);
      // const newRight = this._appendGroupToPlan(this.state.right, grps, planId);
      cb && cb(grps);

      this.setState({
        [stateLoading]: false,
        // left: newLeft,
        // right: newRight,
      });
    }).catch(err => {
      return Promise.reject(err);
    });
  }

  /**
 * 将组信息追加到相对应的计划下
 * @param {*} plans 
 * @param {*} groups 
 * @param {*} targetPlanId 
 */
  _appendGroupToPlan = (plans, groups, targetPlanId, isLeft) => {
    if (!plans || !groups || groups.length == 0) return plans;

    let res = [...plans];
    for (let i = 0; i < res.length; i++) {
      if (res[i].id === targetPlanId) {
        if (isLeft && res[i][this.props.disabledPropsKey]) {
          for (let j = 0; j < groups.length; j++) {
            groups[j][this.props.disabledPropsKey] = true;
          }
        }
        res[i].children = groups;
        break;
      }
    }
    return res;
  }

  _onSearch = (value) => {
    // const {left} = this.state;
    // const afterFilter = left.filter(item=>item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    this.setState({
      filterKey: value
    });
  }

  render() {
    const {
      title,
      rowKey,
      height,
      width,
    } = this.props;

    const {
      loadingL,
      loadingR,
      expandKeysL,
      expandKeysR,
      left,
      right,
      totalCount,
      filterKey,
    } = this.state;

    let selectedCount = 0;
    for (let i = 0; i < right.length; i++) {
      selectedCount += right[i].selectedChildCount || 0;
    }

    let displayData = left;
    if (filterKey) {
      displayData = left.filter(item => item.name.toLowerCase().indexOf(filterKey.toLowerCase()) >= 0);
    }

    return (
      <div className={styles["container"]} style={{ height, width }} >
        <div className={styles["transferContainer"]}>
          <div className={styles["treeViewWrapper"]}>
            <div style={{ marginBottom: 3 }}>
              {/* <a onClick={this._transferAllToRight} href="javascript:;" className={styles['btnSelect']} style={{ float: 'right' }}>全部添加</a> */}
              {/* <span>{title.l}</span> */}
              <Search
                placeholder="输入想要查询的词，按回车键筛选"
                onSearch={this._onSearch}
              />
            </div>
            <div className={styles["treeViewContainer"]}>
              <TreeView
                rowKey={rowKey || 'id'}
                columns={this._initLeftColumn()}
                data={displayData}
                onExpand={this._handleExpandL}
                expandedRowKeys={expandKeysL}
                loading={loadingL}
              />
            </div>
          </div>
          <span className={styles['arrow']} />
          <div className={styles["treeViewWrapper"]}>
            <div style={{ height: 35 }}>
              <a onClick={this._transferAllToLeft} href="javascript:;" className={styles['btnSelect']} style={{ float: 'right' }}>全部删除</a>
              <span>{title.r}</span>
              {/* <span>{title.r}  {selectedCount}/{totalCount}</span> */}
            </div>
            <div className={styles["treeViewContainer"]}>
              <TreeView
                rowKey={rowKey || 'id'}
                columns={this._initRightColumn()}
                data={right}
                onExpand={this._handleExpandR}
                expandedRowKeys={expandKeysR}
                loading={loadingR}
              />
            </div>
          </div>
        </div>
      </div>

    );
  }

  getSelection = () => {
    return { left: this.state.left, right: this.state.right };
  }
}

export default SelectBox;
