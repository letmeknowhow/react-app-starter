
import axios from 'axios';

/* eslint-disable no-undef */

// 添加头部 '/'
function addSlash(path) {
   return /^\//.test(path) ? path : `/${path}`;
}

// 解析参数
function separateParams(url) {
   const [path = '', paramsLine = ''] = url.split('?');

   let params = {};

   paramsLine.split('&').forEach(item => {
      const [key, value] = item.split('=');

      params[key] = value;
   });

   return { path, params };
}

// 主要请求方法
export default function request(config) {
   let { method, url, data = {}, host, headers } = config;

   method = (method && method.toUpperCase()) || 'GET';

   headers = Object.assign(headers || {}, {"Sogou-Request-Type":"XMLHTTPRequest"})

   const { path, params } = separateParams(url);

   url = addSlash(path); 

   return axios({
      url,
      method,
      headers,
      data: method === 'GET' ? undefined : data,
      params: Object.assign(method === 'GET' ? data : {}, params)
   }).catch(err => {
      // 请求出错
      console.log('request error, HTTP CODE: ', err.response.status);

      return Promise.reject(err);
   });
}

// 一些常用的请求方法
export const get = (url, data) => request({ url, data });
export const post = (url, data) => request({ method: 'POST', url, data });
export const put = (url, data) => request({ method: 'PUT', url, data });
export const del = (url, data) => request({ method: 'DELETE', url, data });
