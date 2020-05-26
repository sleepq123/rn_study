const type = {
  THEME_CHANGE: 'THEME_CHANGE',
};

const initState = {
  color: '#0084ff',
};

export default function theme(state = initState, action) {
  switch (action.type) {
    case type.THEME_CHANGE:
      return {
        ...state,
        color: action.color,
      };
    default:
      return state;
  }
}

export const actions = {
  changeTheme: color => ({type: type.THEME_CHANGE, color}),
};
