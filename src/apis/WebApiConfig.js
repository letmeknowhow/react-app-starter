/**
 *  Class: WebApiConfig
 *  Author: Niu Xiaoyu
 *  Date: 16/7/9.
 *  Description: 请求配置项
 */
export default {
  baseurl: '',
  api: [
    {
      name: 'generateAD',
      method: 'post',
      url: 'ajax/advertise/addAdProduct.do',
      desc: '创建广告'
    },
    {
      name: 'modifyAD',
      method: 'post',
      url: 'ajax/advertise/updateAdProduct.do',
      desc: '修改'
    },
    {
      name: 'getUserInfo',
      method: 'get',
      url: 'ajax/advertise/getUserInfo.do',
      desc: '获取企业用户信息'
    },
    {
      name: 'getADList',
      method: 'get',
      url: 'ajax/advertise/getAdProductList.do',
      desc: '查询广告产品列表'
    },
    {
      name: 'getAdProduct',
      method: 'get',
      url: 'ajax/advertise/getAdProduct.do',
      desc: '查询广告产品详情'
    },
    {
      name: 'getNews',
      method: 'get',
      url: 'ajax/ColumnAjax',
      desc: '查询新闻列表'
    }
  ]
};
