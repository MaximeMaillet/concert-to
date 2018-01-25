import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

import submit from './submit.js';

class LoginForm extends Component {
  render() {
    return(
      <form onSubmit={this.props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">User name : </label>
          <Field
            className="form-control"
            id="username"
            name="username"
            component="input"
            type="text"
            placeholder="User name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password : </label>
          <Field
            className="form-control"
            id="password"
            name="password"
            component="input"
            type="password"
          />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login-form',
  onSubmit: submit
})(LoginForm);