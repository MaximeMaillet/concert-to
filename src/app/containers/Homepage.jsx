import React, {Component} from 'react';

import RegisterForm from './RegisterForm/RegisterForm.jsx';
import LoginForm from './LoginForm/LoginForm.jsx';
import Navbar from './Navbar/Navbar.jsx';

export default class Homepage extends Component {
  render() {
    return(
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6">
              <RegisterForm/>
            </div>
            <div className="col-xl-6">
              <LoginForm/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

