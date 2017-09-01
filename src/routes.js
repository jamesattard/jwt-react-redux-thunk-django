import React from 'react';  
import { BrowserRouter, Route, Switch } from 'react-router';  
import App from './components/app';
import App2 from './components/app2';    
import LogInPage from './containers/loginPage';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={App2} />
  </Route>
);
