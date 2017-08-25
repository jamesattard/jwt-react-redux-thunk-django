import { combineReducers } from 'redux';
import session from './sessionReducer';

const rootReducer = combineReducers({
  products: (state = [], action) => action.payload || state,
  session
});

export default rootReducer;
