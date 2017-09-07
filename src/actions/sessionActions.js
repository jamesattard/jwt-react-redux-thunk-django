import axios from 'axios';
import * as types from './actionTypes';  

export function loginSuccess() {  
  return {type: types.LOG_IN_SUCCESS}
}

export function logInUser(credentials) {  
  return function(dispatch) {

    axios.post('http://localhost:7777/auth/', {
      username: credentials.username,
      password: credentials.password
    })
    .then(function (response) {
      console.log("Response: ", response);
      console.log("Token: ", response.data.token)
      sessionStorage.setItem('jwt', response.data.token);
      dispatch(loginSuccess());
    })
    .catch(function (error) {
      console.log(error);
      throw(error);
    });

  };
}