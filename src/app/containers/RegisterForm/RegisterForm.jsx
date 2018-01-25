import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

import submit from './submit.js';

class RegisterForm extends Component {
  render() {
    return(
      <form id="registration-form" onSubmit={this.props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">User name :</label>
          <Field
            className="form-control"
            id="username"
            name="username"
            component="input"
            type="text"
            placeholder="User Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <Field
            className="form-control"
            id="password"
            name="password"
            type="password"
            component="input"
          />
        </div>
        <button type="submit" className="btn btn-secondary">Registration</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration-form',
  onSubmit: submit,
})(RegisterForm);