import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from '../../lib/api.js';
import actions from '../User/actions.js';
import {toastr} from 'react-redux-toastr';
import { withCookies } from 'react-cookie';

import LoginModal from '../../components/LoginModal/LoginModal.jsx';
import RegisterModal from '../../components/RegisterModal/RegisterModal.jsx';
import Accout from './components/Accout.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';

import './components/header.scss';
import logo from '../../assets/images/logo.svg';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginModalOpen: false,
      isRegistrationModalOpen: false,
    };
  }

  componentWillMount() {
    if(this.props.fixed) {
      document.getElementsByTagName('body')[0].classList.add('navbar-fixed');
    }
  }

  handleLogout = () => {
    this.props.startLoading();
    api.logout()
      .then(() => {
        this.props.stopLoading();
        this.props.disconnect();
        this.props.cookies.remove('connect.sid');
      })
      .catch((err) => {
        this.props.stopLoading();
        toastr.error('Error', err.message);
      });
  };

  handleLogin = () => {
    this.toggleLogin();
  };

  handleRegister = () => {
    this.toggleRegistration();
  };

  toggleRegistration = () => {
    this.setState({
      isLoginModalOpen: false,
      isRegistrationModalOpen: !this.state.isRegistrationModalOpen,
    });
  };

  toggleLogin = () => {
    this.setState({
      isRegistrationModalOpen: false,
      isLoginModalOpen: !this.state.isLoginModalOpen,
    });
  };

  registrationSuccess = (response) => {
    this.toggleRegistration();
    toastr.success('Good', 'Your registration is OK!');
    this.props.connect(response.data);
  };

  loginSuccess = (response) => {
    this.toggleLogin();
    const { cookies } = this.props;
    toastr.success('Good', 'You are connected');
    console.log(cookies.get('connect.sid'));
    this.props.connect(response.data);
  };

  failed = (err) => {
    toastr.error('Error', err.message);
  };

  render() {
    return(
      <div>
        <LoginModal
          isOpen={this.state.isLoginModalOpen}
          toggle={this.toggleLogin}
          openRegisterModal={this.toggleRegistration}
          onSubmitSuccess={this.loginSuccess}
          onSubmitFail={this.failed}
        />
        <RegisterModal
          isOpen={this.state.isRegistrationModalOpen}
          toggle={this.toggleRegistration}
          openLoginModal={this.toggleLogin}
          onSubmitSuccess={this.registrationSuccess}
          onSubmitFail={this.failed}
        />
        <Header>
          {(
            this.props.isConnected &&
            <Accout
              handleLogout={this.handleLogout}
              {...this.props}
            />) ||
          <Login
            {...this.props}
            handleLogin={this.handleLogin}
            handleRegister={this.handleRegister}
          />}
        </Header>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    isConnected: state.authUser.isConnected,
    user: state.authUser.user,
  }),
  (dispatch) => bindActionCreators(actions, dispatch)
)(withCookies(Navbar));