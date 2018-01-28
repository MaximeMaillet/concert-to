import React, {Component} from 'react';
import { Link } from 'react-router';

import Navbar from '../Navbar/Navbar.jsx';
import { push } from 'react-router-redux';

class About extends Component {

  home = () => {
    push('/');
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <a href="/">Home</a>
        </div>
      </div>
    );
  }
}

export default About;