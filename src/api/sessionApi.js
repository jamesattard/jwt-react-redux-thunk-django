import axios from 'axios';

class SessionApi {  
  static login(credentials) {

    const request = axios.post('http://localhost:7777/auth/', {
      username: credentials.username,
      password: credentials.password
    })

    return request
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });

  }
}

export default SessionApi; 