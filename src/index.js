import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import App from './components/app';
import LoginPage from './containers/loginPage';

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

// class AuthRoute extends React.Component {
//   render() {
//     const { component: Component, ...rest } = this.props
//     return(
//       <Route {...rest} render={props => (
//         sessionStorage.getItem('jwt') ? (
//           <Component {...props}/>
//         ) : (
//           <Redirect to={{
//             pathname: '/login',
//             state: { from: props.location }
//           }}/>
//         )
//       )}/>
//     );
//   }
// }

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <div>
          <Switch>
            <AuthRoute exact path="/" component={App}  />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container')
);

