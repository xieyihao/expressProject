/**
 * @desc 对基础的fetch进行封装，提供get/post/phpGet/phpPost方法。
 */

import fetch from "isomorphic-fetch";
import {parseParams,convertTimeToStr} from "./tools"

//基础的fetch headers 配置
const BASE_HEADERS_OPTION = {
  timeout: 10000,
  credentials: 'include',
};
//服务端记录log
function serverLog(url, postData,respData,sendTime){
  let resiveTime = Date.now();
  fetch(`/jsapi/log?tag=${url}&str=time:${resiveTime-sendTime}ms params:${JSON.stringify(postData)} response:${JSON.stringify(respData)}`,{method: "GET"});
}

/**
 * @desc 之前方法有局限，采用递归去处理php的FormData。 首次调用仅需前两个参数。
 * @param data
 * @param form
 * @param parentKey
 */
function mapPhpParams(data, form, parentKey) {
  for (let key in data) {
    let currentKey;
    if (parentKey === undefined || parentKey === null || parentKey === '') {
      currentKey = key;
    } else {
      currentKey = `${parentKey}[${key}]`
    }

    if ((typeof data[key] === "object") && (data[key].constructor === Array)) {
      //处理数组
      data[key].map((item, index) => {
        let childKey = `${currentKey}[${index}]`;
        mapPhpParams(item, form, childKey);
      });
    } else if ((typeof data[key] === "object") && (data[key].constructor === Object)) {
      //处理对像
      let childKey = currentKey;
      mapPhpParams(data[key], form, childKey);
    } else {
      //处理普通值（数字、字符传、布尔值）
      form.append(currentKey, data[key]);
    }
  }
}

function errorHandler(error) {
  console.warn('[NETWORK ERROR]', error);
  return Promise.reject(error);
}

/**
 * @desc 处理http返回的请求。
 * @param response
 */
function responseProxy(response) {
  let status = response.status;
  // if (100 <= status && status < 200) {
  //
  // } else if (200 <= status && status < 300) {
  //   //服务正常
  //   return response.json();
  // } else if (300 <= status && status < 400) {
  //
  // } else if (400 <= status && status < 500) {
  //   //未找到服务
  //
  // } else if (500 <= status && status < 600) {
  //   //服务出错
  //
  // } else {
  //
  // }
  if(200 <= status && status < 300) {
    return response.json();
  } else {
    let error = new Error(`${response.status} ${response.statusText}`);
    error.response = response;
    return errorHandler(error);
  }
}

/**
 * @desc fetch封装，可设置请求超时
 * @param url
 * @param fetchParams
 * @return {Promise.<*>}
 */
function request(url, fetchParams) {
  return Promise.race([
    fetch(url, fetchParams),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('request timeout')), fetchParams.timeout ? fetchParams.timeout : 5000)
    })
  ])
}

/**
 * @desc
 * @param methodHeaders 请求方法的headers
 * @param paramHeaders 自定义的headers
 */
function getRequestHeaders(methodHeaders, paramHeaders) {
  return Object.assign({}, methodHeaders, BASE_HEADERS_OPTION, paramHeaders);
}

export function get({url = "", data = null, callback = noop, errorCallback = noop, headers = {}}) {
  const params = parseParams(data), tarUrl = data === null ? url : `${url}?${params}`;
  const sendTime = Date.now();
  return request(tarUrl, getRequestHeaders({method: "GET"}, headers))
    .then(responseProxy)
    .then(json => {
      callback(json);
      return json;
    })
    .catch(e => {
      serverLog(url, data, e, sendTime);
      errorCallback(e);
      return e;
    });
}

export function post({url = "", data = null, callback = noop, errorCallback = noop, headers = {}}) {
  const sendTime = Date.now();
  return request(url, getRequestHeaders({method: "POST", body: JSON.stringify(data)}, headers))
    .then(responseProxy)
    .then(json => {
      callback(json);
      return json;
    })
    .catch(e => {
      serverLog(url, data, e, sendTime);
      errorCallback(e);
      return e;
    });
}

export function phpGet({url = "", data = null, callback = noop, errorCallback = noop, headers = {}}) {
  let postData = {};
  for (let i in data) {
    if ((typeof data[i] === "object") && (data[i].constructor === Array)) {
      data[i].map((item, index) => {
        postData[i + "[" + index + "]"] = item
      });
    } else {
      postData[i] = data[i]
    }
  }
  const params = parseParams(postData), tarUrl = data === null ? url : `${url}?${params}`;
  const sendTime = Date.now();
  return request(tarUrl, getRequestHeaders({method: "GET"}, headers))
    .then(responseProxy)
    .then(json => {
      callback(json);
      return json;
    })
    .catch(e => {
      serverLog(url, data, e, sendTime);
      errorCallback(e);
      return e;
    });
}

export function phpPost({url = "", data = null, callback = noop, errorCallback = noop, headers = {}}) {
  let form = new FormData(data);
  mapPhpParams(data, form);
  const sendTime = Date.now();
  return request(url, getRequestHeaders({method: "POST", body: form}, headers))
    .then(responseProxy)
    .then(json => {
      callback(json);
      return json;
    })
    .catch(e => {
      serverLog(url, data, e, sendTime);
      errorCallback(e);
      return e;
    });
}

function noop() {}
