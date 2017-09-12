import React, { PropTypes } from 'react';  
import { bindActionCreators } from 'redux'; 
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSuccess } from '../actions/sessionActions';

class Header extends React.Component {  
  componentWillMount() {
    if (sessionStorage.getItem('jwt'))
      this.props.loginSuccess();
  }

  render() {
    console.log("logged_in: ", this.props.logged_in);

    if (this.props.logged_in) {
      return (
        <nav>
          <NavLink to="/" 
            activeClassName="active">Home</NavLink>
          {" | "}
          <Link to="/products" activeClassName="active">Products</Link>
          {" | "}
          <a href="/logout">log out</a>
        </nav>
      );
    } else {
      return (
        <nav>
          <NavLink to="/" 
            activeClassName="active">Home</NavLink>
          {" | "}
          <Link to="/login" activeClassName="active">
            log in</Link>
        </nav>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {  
  return {logged_in: state.logged_in};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginSuccess }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
