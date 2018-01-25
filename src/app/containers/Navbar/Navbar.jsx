import React, {Component} from 'react';

import Main from './components/Main.jsx';

export default class Navbar extends Component {

  componentWillMount() {
    if(this.props.fixed) {
      document.getElementsByTagName('body')[0].classList.add('navbar-fixed');
    }
  }

  render() {
    return(
      <Main
        {...this.props}
      />
    );
  }
}

