import cookie from 'react-cookies'

import {
    USER_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    TOAST,
    TOASTNULL,
    LOGINERROR,
    REGISTERERROR
  } from './auth.types';
  
  let tokenChange = cookie.load('token')
  if (!tokenChange){
    tokenChange = null
  }
  const authState = tokenChange? true : false;

  const initialState = {
    token: tokenChange,
    staff_id: cookie.load('staff_id'),
    staff: cookie.load('staff'),
    isAuthenticated: authState,
    isLoading: false,
    toast: false,
    toastMessage: '',
    error: ''
  }
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case LOGIN_SUCCESS:
  
        cookie.save('token', action.payload.data.token, { path: '/', expires: new Date(Date.now()+ 3600 * 1000 * 24 * 60)});
        cookie.save('staff_id', action.payload.data.staff_id, { path: '/', expires: new Date(Date.now()+ 3600 * 1000 * 24 * 60)});
        cookie.save('staff', action.payload.data.staff_category, { path: '/', expires: new Date(Date.now()+ 3600 * 1000 * 24 * 60)});
        return {
          ...state,
          token: action.payload.data.token,
          isLoading: false,
          staff: action.payload.data.staff_category,
          isAuthenticated: true,
          staff_id: action.payload.data.staff_id,
          toastMessage: action.payload.msg,
          error: action.payload.status
        };
      case REGISTER_SUCCESS:
        cookie.save('token', action.payload.data.token, { path: '/', expires: new Date(Date.now()+ 3600 * 1000 * 24 * 60)});
        cookie.save('staff_id', action.payload.data.staff_id, { path: '/', expires: new Date(Date.now()+ 3600 * 1000 * 24 * 60)});
        cookie.save('staff', action.payload.data.staff_category, { path: '/', expires: new Date(Date.now()+ 3600 * 1000 * 24 * 60)});
        return {
          ...state,
          token: action.payload.data.token,
          isLoading: false,
          staff: action.payload.data.staff_category,
          isAuthenticated: true,
          staff_id: action.payload.data.staff_id,
          toastMessage: action.payload.msg,
          error: action.payload.status
        };
      case LOGOUT_SUCCESS:
        cookie.remove('token', { path: '/', expires: new Date(Date.now()+ 3600 * 1000 * 24 * 60)})
        cookie.remove('staff_id', { path: '/', expires: new Date(Date.now()+ 3600 * 1000 * 24 * 60)});
        cookie.remove('staff', { path: '/', expires: new Date(Date.now()+ 3600 * 1000 * 24 * 60)});
        // window.location.reload();
        return {
          ...state,
          token: null,
          staff_id: null,
          isAuthenticated: false,
          isLoading: false,
          error: "200",
          toastMessage: "Successfully Loggedout!"
        };
      
      case TOAST:
        return {
          ...state,
          toast: true,
        };

      case TOASTNULL:
        return{
          ...state,
          toast: false,
          error: '',
          toastMessage: ''
        } 
      case LOGINERROR:
        
        return {
          ...state,
          toastMessage: action.payload,
          isLoading: false,
          error: 400
        }
      case REGISTERERROR:
        let msg = '';
        if ('staff_id' in action.payload.data){
          msg = action.payload.data.staff_id[0]
        }
        else{
          msg = action.payload.data.msg
        }
        return {
          ...state,
          toastMessage: msg,
          isLoading: false,
          error: 400
        }
      default:
        return state;
    }
  }
  