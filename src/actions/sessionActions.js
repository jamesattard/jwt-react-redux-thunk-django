import axios from 'axios';
import * as types from './actionTypes';
import SessionApi from '../api/sessionApi';

export function loginSuccess() {  
  return {type: types.LOG_IN_SUCCESS}
}

export function logInUser(credentials, callback) {  
  return function(dispatch) {
    return SessionApi.login(credentials).then(response => {
      sessionStorage.setItem('jwt', response.data.token);
      dispatch(loginSuccess());
    })
    .then(() => callback())
    .catch(function (error) {
      callback();
      // throw(error);
      // dispatch(loginFailure());
    })
  };
}