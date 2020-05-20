import {Get} from '../utils/http';

export const getTestData = parmas => {
  let url = '/basics/messageFailure/queryMqFailedMessage';
  return Get(url, parmas);
};
