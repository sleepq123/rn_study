import {createStore, applyMiddleware, combineReducers} from 'redux';
import reducers from '../reducer';

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  applyMiddleware(),
);

export default store;
