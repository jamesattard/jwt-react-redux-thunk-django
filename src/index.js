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
    ) :
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )}/>
)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
          <Route exact path="/" component={App}  />
          <Route path="/login" component={LoginPage} />
          <AuthenticatedRoute path="/private" component={Private} />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
