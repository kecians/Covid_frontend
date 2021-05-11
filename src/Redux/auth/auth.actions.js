//  import dependecies

import axios from 'axios';

//import APIs
 
import { userLogin, userRegister } from '../../Api/user.api'

// import TYPES

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


// Login User
export const loading = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });
};

export const login = (username, password) => (dispatch) => {
  // headers
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  // Body
  const body = JSON.stringify({
    username,
    password,
  });

  axios
    .post(userLogin, body, config)
    .then((response) => {
      if (response.data.status === 400) {
        dispatch({
          type: LOGINERROR,
          payload: response.data.msg
        });
        dispatch({
          type: TOAST,
        });
        dispatch({
          type: TOASTNULL,
        })
      } else if (response.data.status === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: TOAST,
        });
        dispatch({
          type: TOASTNULL,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: LOGINERROR,
        payload: "Something went wrong!"
      });
      dispatch({
        type: TOAST,
      });
      dispatch({
        type: TOASTNULL,
      });
    });
};

// LOGOUT
export const logout = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  dispatch({
    type: TOAST,
  });
  dispatch({
    type: TOASTNULL,
  })

  
};

//  Register User
export const register = (username, password, password2, staff_categ) => (
  dispatch,
) => {
  console.log(username, password, password2, staff_categ)
  // headers
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  if (staff_categ === 'Nurse') {
    staff_categ = 'N';
  } else if (staff_categ === 'Doctor') {
    staff_categ = 'D';
  } else {
    staff_categ = '';
  }
  // Body
  const body = JSON.stringify({
    username,
    password,
    password2,
    staff_categ
  });
  axios
    .post(userRegister, body, config)
    .then((response) => {
      dispatch({
        type: USER_LOADING,
      });
      if (response.data.status === 400) {
        dispatch({
          type: REGISTERERROR,
          payload: response.data
        })
        dispatch({
          type: TOAST,
        });
        dispatch({
          type: TOASTNULL,
        })
      } else if (response.data.status === 201) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: TOAST,
        });
        dispatch({
          type: TOASTNULL,
        })
      }
    })
    .catch((err) => {
      dispatch({
        type: REGISTERERROR,
        payload: {data: {msg: "Something went wrong!"}}
      })
      dispatch({
        type: TOAST,
      });
      dispatch({
        type: TOASTNULL,
      })
      
    });
};
