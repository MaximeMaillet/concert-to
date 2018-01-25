import React, {Component} from 'react';

import HeaderTitle from '../styledComponent/HeaderTitle.jsx';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="logo">
          <img src="" />
          <HeaderTitle>Concert To</HeaderTitle>
        </div>
      </header>
    );
  }
}