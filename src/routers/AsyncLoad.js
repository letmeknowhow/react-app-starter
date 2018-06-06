/**
 * author: niuxiaoyu
 * description: 用该组件封装其他组件实现懒加载
 * date: 2018/6/6
 */
import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

export default function AsyncLoad(opts) {
  return Loadable({
    ...opts,
    loading: Loading,
    delay: 200,
    timeout: 2000,
  })
};


const Loading = ({isLoading, timedOut, pastDelay, error}) => {
  if (isLoading) {
    if (timedOut) {
      return '组件加载超时！'
    } else if (pastDelay) {
      return <Spin />
    } else {
      return null
    }
  } else if (error) {
    return '组件加载失败！'
  } else {
    return null
  }
}