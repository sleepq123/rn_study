import {Get} from '../utils/http';
import {zhuanlanURL} from '../config';

const zhuanlanGet = (url, params) => {
  return Get(zhuanlanURL + url, params);
};
/**
 * 获取推荐专栏
 * @param {*} params
 */
export const getColumnRecommendations = (
  params = {limit: 6, offset: 6, seed: 7},
) => {
  const url = 'recommendations/columns';
  return zhuanlanGet(url, params);
};

/**
 * 获取指定专栏信息
 * @param {*} colName 专栏名
 */
export const getColumnDetail = colName => {
  const url = `columns/${colName}`;
  return zhuanlanGet(url);
};

/**
 * 获取指定专栏文章列表
 * @param {*} colName 专栏名
 * @param {*} params
 */
export const getArticleList = (colName, params = {limit: 10, offset: 0}) => {
  const url = `columns/${colName}/articles`;
  return zhuanlanGet(url, params);
};

/**
 * 获取指定文章内容 (html类型)
 * @param {*} articleId
 */
export const getArticleDetail = articleId => {
  const url = `p/${articleId}`;
  return zhuanlanGet(url);
};

/**
 * 获取相关文章推荐
 * @param {*} articleId
 * @param {*} params
 */
export const getArticleRecommendation = (
  articleId,
  params = {include: 'data%5B*%5D.article.column', limit: 12, offset: 0},
) => {
  const url = `articles/${articleId}/recommendation`;
  return Get(url, params);
};

/**
 * 获取相关文章评论
 * @param {*} articleId
 * @param {*} params
 */
export const getArticleRootComment = (
  articleId,
  params = {order: 'normal', status: 'open', limit: 20, offset: 0},
) => {
  const url = `articles/${articleId}/root_comments`;
  return zhuanlanGet(url, params);
};
