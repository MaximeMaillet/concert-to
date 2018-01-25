import React, {Component} from 'react';

import Header from '../components/Header.jsx';
import RegisterForm from '../components/Forms/RegisterForm.jsx';
import LoginForm from '../components/Forms/LoginForm.jsx';

export default class Homepage extends Component {
  render() {
    return(
      <div>
        <Header/>
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

