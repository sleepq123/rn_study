import {Get} from '../utils/http';
import {zhihuURL} from '../config';

const zhihuGet = (url, params) => {
  return Get(zhihuURL + '/v3/' + url, params);
};

const zhihuGetV4 = (url, params) => {
  return Get(zhihuURL + '/v4/' + url, params);
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

/**
 * 搜索联想
 * @param {*} params
 */
export const getSearchSuggest = (params = {q: ''}) => {
  let url = 'search/suggest';
  return zhihuGetV4(url, params);
};

/**
 * 搜索
 * @param {*} params
 * t 可选值： general, people, topic , column, live, album, publication
 */
export const doSearch = (
  params = {t: 'general', q: '', offset: 0, limit: 20},
) => {
  let url = 'search_v3?&correction=1&lc_idx=0&show_all_topics=0';
  console.log(url);
  console.log(params);

  return zhihuGetV4(url, params);
};
