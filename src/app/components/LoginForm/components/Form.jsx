import React, {Component} from 'react';
import { Field } from 'redux-form';

class Form extends Component {
  render() {
    const { className } = this.props;
    return(
      <form {...this.props} className={className}>
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
        <button type="submit" className="btn btn-primary">Connection</button>
      </form>
    );
  }
}

export default Form;