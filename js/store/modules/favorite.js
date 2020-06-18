const type = {
  FAVORITE_ADD_ITEM: 'FAVORITE_ADD_ITEM',
  FAVORITE_DELETE_ITEM: 'FAVORITE_DELETE_ITEM',
};
const initState = {
  items: [],
};

export default function theme(state = initState, action) {
  switch (action.type) {
    case type.FAVORITE_ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case type.FAVORITE_DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => {
          return item.id !== action.id;
        }),
      };
    default:
      return state;
  }
}

export const actions = {
  addFavoriteItem: item => ({type: type.FAVORITE_ADD_ITEM, payload: item}),
  delFavoriteItem: id => ({type: type.FAVORITE_DELETE_ITEM, id}),
};
