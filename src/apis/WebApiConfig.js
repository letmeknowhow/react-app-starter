/**
 *  Class: WebApiConfig
 *  Author: Niu Xiaoyu
 *  Date: 16/2/16.
 *  Description: 请求配置项
 */

import global from '../config/global';

export default {
  baseurl: '',
  api: [
    //{
    //  name: 'login',
    //  method: 'post',
    //  url: global.loggedBaseURL + '/api/session',
    //  desc: '用户登录的接口'
    //},
    //{
    //  name: 'extended',
    //  method: 'putuser',
    //  url: global.loggedBaseURL + '/api/session',
    //  desc: '延长用户session的接口'
    //},
    //{
    //  name: 'banners',
    //  method: 'get',
    //  url: global.webApiURL + '/ColumnAjax',
    //  desc: 'banner查询'
    //},
    //{
    //  name: 'newsColumns',
    //  method: 'get',
    //  url: global.webApiURL + '/api/newsColumns',
    //  desc: '栏目查询'
    //},
    //{
    //  name: 'newsInfos',
    //  method: 'get',
    //  url: global.webApiURL + '/api/newsInfos',
    //  desc: '查询快讯'
    //},
    //{
    //  name: 'newsInfoDetails',
    //  method: 'getid',
    //  url: global.webApiURL + '/api/newsInfos/app',
    //  desc: '查询快讯详情'
    //},
    //{
    //  name: 'appWealthUserInfos',
    //  method: 'get',
    //  url: global.loggedBaseURL + '/api/settings/appWealthUserInfos',
    //  desc: '个人信息查询'
    //},
    //{
    //  name: 'updateGesturePasswords',
    //  method: 'putuser',
    //  url: global.webApiURL + '/api/settings/gesturePasswords',
    //  desc: '修改手势密码'
    //},
    //{
    //  name: 'gesturePasswords',
    //  method: 'get',
    //  url: global.webApiURL + '/api/settings/gesturePasswords',
    //  desc: '查询手势密码'
    //},
    {
      name: 'getNews',
      method: 'get',
      url: 'ajax/ColumnAjax',
      desc: '查询新闻列表'
    }
  ]
}
