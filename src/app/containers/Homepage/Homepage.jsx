import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toastr} from 'react-redux-toastr';

import actions from '../User/actions.js';

import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import Navbar from '../Navbar/Navbar.jsx';

class Homepage extends Component {
  render() {
    return(
      <div>
        <Navbar />
        <div className="container-fluid">

        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    user: state.authUser.user,
  }),
  (dispatch) => bindActionCreators(actions, dispatch)
)(Homepage);