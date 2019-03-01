import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import posts from './postReducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  posts: posts
});

export default rootReducer;