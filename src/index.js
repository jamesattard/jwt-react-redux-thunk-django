import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import App from './components/app';
import LoginPage from './containers/loginPage';
import Header from './containers/header';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const AuthRoute = ({ component: Component, ...rest }) => (  
  <Route {...rest} render={props => (
    sessionStorage.getItem('jwt') ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const LoginRoute = ({ component: Component, ...rest }) => (  
  <Route {...rest} render={props => (
    sessionStorage.getItem('jwt') ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props}/>
    )
  )}/>
)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <AuthRoute exact path="/" component={App}  />
            <LoginRoute path="/login" component={LoginPage} />
            <Redirect to="/" />
          </Switch>
        </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container')
);

