import {Get} from '../utils/http';

export const getTestData = parmas => {
  let url = `columns/${parmas}`;
  return Get(url);
};
