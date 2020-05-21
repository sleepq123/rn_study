import Type from '../type';

const initState = {
  current: '',
  likedColumns: [
    {
      colLabel: 'java',
      colKey: 'java',
      data: {},
    },
    {
      colLabel: 'android',
      colKey: 'android',
      data: {},
    },
  ], // 用户收藏的专栏
};

export default function specialColumn(state = initState, action) {
  switch (action.type) {
    case Type.COLUMNE_CHANGE:
      return {
        ...state,
        current: action.current,
      };
    default:
      return state;
  }
}
