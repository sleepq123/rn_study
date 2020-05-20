let initState = {
  color: '#2ad4db',
};

export default function theme(state = initState, action) {
  switch (action.type) {
    case 'THEME_CHANGE':
      return {
        ...state,
        color: action.color,
      };
    default:
      return state;
  }
}