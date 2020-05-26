const type = {
  COLUMNE_CHANGE: 'COLUMNE_CHANGE',
};

const initState = {
  current: '',
  likedColumns: {
    1: {
      seed: '1',
      colLabel: '教育',
    },
    2: {
      seed: '2',
      colLabel: '设计',
    },
    3: {
      seed: '3',
      colLabel: '创业',
    },
    4: {
      seed: '4',
      colLabel: '投资',
    },
    7: {
      seed: '7',
      colLabel: '技术',
    },
  }, // 用户收藏的专栏
};

export default function column(state = initState, action) {
  switch (action.type) {
    case type.COLUMNE_CHANGE:
      return {
        ...state,
        current: action.current,
      };
    default:
      return state;
  }
}

export const actions = {
  changeCurrentTab: current => ({type: type.COLUMNE_CHANGE, current}),
};
