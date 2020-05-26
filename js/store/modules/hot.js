const type = {
  TAB_CHANGE: 'TAB_CHANGE',
};

const initState = {
  current: 'total',
  hotTab: {
    total: {
      value: 'total',
      label: '全部',
    },
    science: {
      value: 'science',
      label: '科学',
    },
    digital: {
      value: 'digital',
      label: '数码',
    },
  },
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
  changeCurrentTab: current => ({type: type.TAB_CHANGE, current}),
};
