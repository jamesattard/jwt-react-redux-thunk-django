import React, { PropTypes } from 'react';  
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';  
import * as sessionActions from '../actions/sessionActions';

class LogInPage extends React.Component {  

  constructor(props) {
    super(props);

    this.state = {
      credentials: {username: '', password: ''}
    }

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.logInUser(this.state.credentials, () => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div className="container panel panel-default">
        <h1 className="text-center">Login</h1>
          <form className="form-horizontal panel-body">
            <div className="form-group">
              <input 
                name="username"
                type="text" 
                value={this.state.credentials.username} 
                className="form-control" 
                placeholder="Username" 
                onChange={this.onChange} />
            </div>

            <div className="form-group">
              <input 
                name="password"
                type="password" 
                value={this.state.credentials.password} 
                className="form-control" 
                placeholder="Password" 
                onChange={this.onChange} />
            </div>

            <div className="form-group text-center">
              <input 
                type="submit" 
                className="btn btn-info" 
                onClick={this.onSave} />
            </div>
          </form>
      </div>        
  );
  }
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(LogInPage);