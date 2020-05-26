import axios from 'axios';
import Qs from 'qs';
import {Toast} from '@ant-design/react-native';

const Axios = axios.create({
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

Axios.interceptors.request.use(
  config => {
    // 判断token是否存在
    config.headers.Authorization = 'token';
    return config;
  },
  error => {
    Toast.fail(error);
    return Promise.reject(error);
  },
);

Axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    let code = '0000';
    let msg = '';
    if (error && error.response) {
      code = error.response.status;

      switch (code) {
        case 401: // 未授权登录
          msg = '未授权登录';
          break;
        case 400:
          msg = '错误请求';
          break;
        case 403:
          msg = '拒绝访问';
          break;
        case 404:
          msg = '请求错误,未找到该资源';
          break;
        case 405:
          msg = '请求方法未允许';
          break;
        case 408:
          msg = '请求超时';
          break;
        case 413:
          msg = '请求数据过多';
          break;
        case 500:
          msg = '服务器端出错';
          break;
        case 501:
          msg = '网络未实现';
          break;
        case 502:
          msg = '网络错误';
          break;
        case 503:
          msg = '服务不可用';
          break;
        case 504:
          msg = '网络超时';
          break;
        case 505:
          msg = 'http版本不支持该请求';
          break;
        default:
          msg = '连接到服务器失败';
      }
    } else {
      msg = '啊呀诶，网络错误了';
    }
    Toast.fail(`${code}:${msg}`);
    return Promise.reject({code, msg: error});
  },
);

/**
 * get
 * @param url 请求地址
 * @param params 参数对象
 */
export function Get(url, params) {
  return new Promise((resolve, reject) => {
    Axios.get(url, {params})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * post
 * @param url 请求地址
 * @param params 参数对象
 */
export function Post(url, params) {
  return new Promise((resolve, reject) => {
    Axios.post(url, Qs.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
