import axios from 'axios';

class SessionApi {  
  static login(credentials) {

    axios.post('http://localhost:7777/auth/', {
      username: credentials.username,
      password: credentials.password
    })
    .then(function (response) {
      console.log(response);
      return response.json;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });

  }
}

export default SessionApi; 
