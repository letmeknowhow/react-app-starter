/**
 * class: OpenDrawer
 * author: niuxiaoyu
 * description: 将组件以抽屉形式打开
 * date: 2017/12/19
 */
import React, { Component } from 'react';
import { Panel, openPanel } from "@bizfe/biz-rc-panel";

/**
 * 将组件以抽屉形式打开
 * @param {*} WrappedComponent 
 * @param {*} panelOption 
 * @param {*} wrapProps 
 */
export default function CreateDrawer(WrappedComponent, panelOption = {}, wrapProps = {}) {
  let drawer;
  //options中level是用于判断开几级抽屉，wrapProps用于给里面的WrappedComponent组件传props
  const { level } = panelOption;
  delete panelOption.level;
  const closeDrawer = () => {
    drawer._close();
  }

  const openDrawer = (props) => {
    const config = {
      customClass: 'panel-add-pic-material newAnt',
      marginLeft: (level || 1) + "0%",
      content: (<WrappedComponent {...{ closeDrawer, ...wrapProps, ...props }} store={Store} />),
      ...panelOption
    }

    return drawer = openPanel(config, document.body);
  }

  return { openDrawer }
}

