import {Get} from '../utils/http';
import {zhihuURL} from '../config';

const zhihuGet = (url, params) => {
  console.log(params);

  return Get(zhihuURL + '/v3/' + url, params);
};

/**
 * 热榜
 * @param {*} type
 * @param {*} params
 */
export const getHostlist = (type, params) => {
  let url = `feed/topstory/hot-lists/${type}`;
  return zhihuGet(url, params);
};
