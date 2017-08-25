import React from 'react';  
import { Route, IndexRoute } from 'react-router';  
import App from './components/app';  
import HomePage from './components/home/HomePage';  
import CatsPage from './components/cats/CatsPage';  
import AboutPage from './components/about/AboutPage';  
import CatPage from './components/cats/CatPage';  
import NewCatPage from './components/cats/NewCatPage';  
import LogInPage from './components/LogInPage';

export default (  
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/login" component={LogInPage} />
    <Route path="/cats" component={CatsPage}>
      <Route path="/cats/new" component={NewCatPage} />
      <Route path="/cats/:id" component={CatPage} />
    </Route>
  </Route>
);
