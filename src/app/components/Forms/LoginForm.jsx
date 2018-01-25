import React, {Component} from 'react';

export default class LoginForm extends Component {
  render() {
    return(
      <form>
        <div className="form-group">
          <label for="login">Login : </label>
          <input type="text" name="login" id="login" />
        </div>
        <div className="form-group">
          <label for="login">Login : </label>
          <input type="text" name="password" id="password" />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    );
  }
}

