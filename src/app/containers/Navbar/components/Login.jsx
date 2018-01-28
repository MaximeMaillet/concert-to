import React, {Component} from 'react';

import './header.scss';

class Login extends Component {
  render() {
    return(
      <div className="login">
        <a href="#" className="btn btn-secondary" onClick={this.props.handleLogin}>
          Log In
        </a>
        <a href="#" className="btn btn-primary" onClick={this.props.handleRegister}>
          Sign In
        </a>
      </div>
    );
  }
}

export default Login;