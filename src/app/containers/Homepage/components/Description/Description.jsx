import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import {Search, Loader, Music} from 'react-feather';

import './Description.scss';

export default class Description extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 cadre">
            <div className="step search">
              <Search size={60} />
              Search
            </div>
          </div>
          <div className="col-md-4 cadre">
            <div className="step wait">
              <Loader size={60} />
              Wait
            </div>
          </div>
          <div className="col-md-4 cadre">
            <div className="step enjoy">
              <Music size={60} />
              Enjoy !
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center link">
          {this.props.user ?
            <Link to="/search" className="btn btn-primary d-block text-center m-auto">Let's go</Link>
            :
            <div className=" d-block text-center m-auto">Register you !</div>}
        </div>
      </div>
    );
  }
}