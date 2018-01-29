import React, {Component} from 'react';

import './header.scss';
import logo from '../../../assets/images/logo.svg';

class Header extends Component {

  render() {
    return(
      <header className={`${this.props.fixed ? 'fixed': ''}`}>
        <a href="/" className="logo">
          <img src={logo} alt="Concert To - Get your concert to world" className="pb-5" />
        </a>
        <div className="title-group">
          <div className="title">Concert To</div>
          <div className="subtitle">Find your favorite artists, everywhere, everytime ...</div>
        </div>
        {this.props.children}
      </header>
    );
  }
}

export default Header;