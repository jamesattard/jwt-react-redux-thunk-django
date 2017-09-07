import axios from 'axios';
import * as types from './actionTypes';  

export function loginSuccess() {  
  return {type: types.LOG_IN_SUCCESS}
}

export function logInUser(credentials, callback) {  
  return function(dispatch) {

    axios.post('http://localhost:7777/auth/', {
      username: credentials.username,
      password: credentials.password
    })
    .then(function (response) {
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