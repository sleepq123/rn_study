const type = {
  ADD_WORDS: 'ADD_WORDS',
  CLEAR_WORDS: 'CLEAR_WORDS',
  CHANGE_SEARCH_TYPE: 'CHANGE_SEARCH_TYPE',
};

const initState = {
  searchWords: [],
  searchType: 'general',
};

export default function theme(state = initState, action) {
  switch (action.type) {
    case type.ADD_WORDS:
      let searchWords = Array.from(
        new Set(state.searchWords.push(action.payload)),
      ).slice(0, 10);
      return {
        ...state,
        searchWords,
      };
    case type.CLEAR_WORDS:
      return {
        ...state,
        searchWords: [],
      };
    case type.CHANGE_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.searchType,
      };
    default:
      return state;
  }
}

export const actions = {
  addWord: word => ({type: type.ADD_WORDS, payload: word}),
  clearWord: () => ({type: type.CLEAR_WORDS}),
  changeSearchType: searchType => ({
    type: type.CHANGE_SEARCH_TYPE,
    searchType,
  }),
};
