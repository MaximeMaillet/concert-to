import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import Form from './components/Form.jsx';

import submit from './submit.js';

class RegisterForm extends Component {

  render() {
    return(
      <Form
        autoComplete="off"
        id="registration-form"
        onSubmit={this.props.handleSubmit}
      />
    );
  }
}

export default reduxForm({
  form: 'registration-form',
  onSubmit: submit,
})(RegisterForm);