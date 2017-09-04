import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import App from './components/app';
import Private from './components/private'
import LoginPage from './containers/loginPage';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const AuthenticatedRoute = ({ component: Component, ...rest }) => (  
  <Route {...rest} render={props => (
    sessionStorage.getItem('jwt') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: "/login",
        state: { from: props.location }
      }} />
    )
  )}/>
)

const PRIVATE_ROOT = '/';
const PUBLIC_ROOT = '/login';

const AuthRoute = ({component, ...props}) => {
  const { isPrivate } = component;
  if (sessionStorage.getItem('jwt')) {
    //User is Authenticated
    if (isPrivate === true) {
      //If the route is private the user may proceed.
      return <Route { ...props } component={ component } />;
    }
    else {
      //If the route is public, the user is redirected to the app's private root.
      return <Redirect to={ PRIVATE_ROOT } />;
    }
  }
  else {
    //User is not Authenticated
    if (isPrivate === true) {
      //If the route is private the user is redirected to the app's public root.
      return <Redirect to={ PUBLIC_ROOT } />;
    }
    else {
      //If the route is public, the user may proceed.
      return <Route { ...props } component={ component } />;
    }
  }
};

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
          <AuthRoute exact path="/" component={App}  />
          <AuthRoute path="/login" component={LoginPage} />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

