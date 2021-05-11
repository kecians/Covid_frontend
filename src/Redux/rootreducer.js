import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer'
// import profileReducer from './profileinfo/profile.reducer'

const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer
