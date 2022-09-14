import { combineReducers } from 'redux';
import authReducer from './auth.reducer'
import patientProfileReducer from './patientProfile';
// import profileReducer from './profileinfo/profile.reducer'

const rootReducer = combineReducers({
  authReducer,
  patient : patientProfileReducer
});

export default rootReducer
