import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

import submit from './submit.js';
import Form from './components/Form.jsx';

class LoginForm extends Component {
  render() {
    return(
      <Form
        className={this.props.className}
        onSubmit={this.props.handleSubmit}
        form="login-form"
      />
    );
  }
}

export default reduxForm({
  form: 'login-form',
  onSubmit: submit
})(LoginForm);