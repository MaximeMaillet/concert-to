import React, {Component} from 'react';
import { withCookies, Cookies } from 'react-cookie';

import RegisterForm from './RegisterForm/RegisterForm.jsx';
import LoginForm from './LoginForm/LoginForm.jsx';
import Navbar from './Navbar/Navbar.jsx';

import api from '../lib/api.js';

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  click = () => {
    // const { cookies } = this.props;
    api.user({sort: 'true'}).then((res) => {
      console.log(res);
      // console.log(cookies.getAll());
    });
  };

  componentWillMount() {
    // const { cookies } = this.props;
    // console.log(cookies.get('sessionID'));
  }

  render() {
    return(
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6">
              <a href="#" onClick={this.click}>CLICK</a>
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

// export default withCookies(Homepage);
export default Homepage;