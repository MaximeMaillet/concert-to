import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

import './RegisterModal.scss';

import RegisterForm from '../RegisterForm/RegisterForm.jsx';

class RegisterModal extends Component {
  render() {
    return(
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <div className="text-center">
            Sign In and discover your event's artists
          </div>
          <RegisterForm
            {...this.props}
          />
        </ModalBody>
        <ModalFooter className="text-center">
          {this.props.openLoginModal && <a href="javascript:" onClick={this.props.openLoginModal}>Se connecter</a>}
        </ModalFooter>
      </Modal>
    );
  }
}

export default RegisterModal;

