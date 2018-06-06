/**
 * author: niuxiaoyu
 * description: 编辑投放范围
 * date: 2018/6/6
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SelectBox } from 'component';

import {
  makeSkuUnitPlanTree,
  makeSelectedSkuUnitGrpTree
} from 'modules/skuunit/scopeSelection';

@connect(
  state => ({ scopeSelection: state.scopeSelection }),
  dispatch => bindActionCreators({
    makeSkuUnitPlanTree,
    makeSelectedSkuUnitGrpTree,
  }, dispatch)
)
class ScopeSelection extends Component {
  static contextTypes = {
    store: PropTypes.object,
  }

  static propTypes = {
    getInstance: PropTypes.func
  };

  componentDidMount() {
    //返回SelectBox的实例
    const { getInstance, makeSkuUnitPlanTree, makeSelectedSkuUnitGrpTree, unitId } = this.props;
    getInstance && getInstance(this.sb);

    makeSkuUnitPlanTree(unitId)
    makeSelectedSkuUnitGrpTree(unitId);
  }

  render() {
    const {
      unitPlanTree,
      unitSelectedTree,
      loadingL,
      loadingR,
    } = this.props.scopeSelection;
    return (
      <div>
        <SelectBox
          ref={sb => this.sb = sb}
          title={{ l: '请选择目标子级：', r: '已添加目标子级：' }}
          dataSourceL={unitPlanTree}
          dataSourceR={unitSelectedTree}
          childrenLoadUrl='/skuunit/makeSkuUnitGrpTree.action'
          loadingL={loadingL}
          loadingR={loadingR}
        />
      </div>
    )
  }
}

export default ScopeSelection;