import { combineReducers } from 'redux';
import general from './general/reducers';
import auth from './auth/reducers';

const rootReducer = combineReducers({
  general,
  auth,
});

export default rootReducer;
