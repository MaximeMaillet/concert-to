import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

import './LoginModal.scss';

import LoginForm from '../LoginForm/LoginForm.jsx';

class LoginModal extends Component {
  render() {
    return(
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <div className="text-center">
            Log In and discover your event's artists
          </div>
          <LoginForm
            {...this.props}
          />
        </ModalBody>
        <ModalFooter className="text-center">
          {this.props.openRegisterModal && <a href="javascript:" onClick={this.props.openRegisterModal}>S'inscrire</a>}
        </ModalFooter>
      </Modal>
    );
  }
}

export default LoginModal;

