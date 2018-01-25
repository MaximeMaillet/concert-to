import React, {Component} from 'react';

import Accout from './Accout.jsx';

import './header.scss';
import logo from '../../../assets/images/logo.svg';

class Main extends Component {
  render() {
    return(
      <header className={`
        ${this.props.className}
        ${this.props.fixed ? 'fixed': ''}
      `}>
        <div className="logo">
          <img src={logo} alt="Concert To - Get your concert to world" className="pb-5" />
        </div>
        <div className="title">Concert To</div>
        <Accout/>
      </header>
    );
  }
}

export default Main;