import React, {Component} from 'react';
import { Field } from 'redux-form';

class Form extends Component {
  render() {
    return(
      <form {...this.props}>
        <div className="form-group">
          <label htmlFor="username">Email :</label>
          <Field
            className="form-control"
            id="register-email"
            name="email"
            component="input"
            type="email"
            placeholder="E-mail"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <Field
            className="form-control"
            id="register-password"
            name="password"
            type="password"
            component="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Username :</label>
          <Field
            className="form-control"
            id="register-username"
            name="username"
            type="text"
            component="input"
            placeholder="User name"
          />
        </div>
        <button type="submit" className="btn btn-secondary">Registration</button>
      </form>
    );
  }
}

export default Form;