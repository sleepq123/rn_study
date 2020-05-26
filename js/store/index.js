import {createStore, applyMiddleware, combineReducers} from 'redux';
import modules from './modules';

const store = createStore(
  combineReducers({
    ...modules,
  }),
  applyMiddleware(),
);

export default store;
