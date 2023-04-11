import { userReducer } from './user';
import { combineReducers } from 'redux';
const allReducer = combineReducers({
  user: userReducer
});
export default allReducer;
