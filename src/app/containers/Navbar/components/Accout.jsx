import React, {Component} from 'react';

class Accout extends Component {
  render() {
    return(
      <div className="account">
        <div className="username">
          {this.props.user.username}
        </div>
        <a href="#" className="btn btn-primary" onClick={this.props.handleLogout}>
          Log Out
        </a>
      </div>
    );
  }
}

export default Accout;