import { combineReducers } from 'redux';
import count from './modules/count/reducer';
import data from './modules/data/reducer';

export const rootReducer = combineReducers({
  count,
  data,
});
