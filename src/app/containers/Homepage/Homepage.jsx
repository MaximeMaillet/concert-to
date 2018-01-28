import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toastr} from 'react-redux-toastr';

import actions from '../User/actions.js';

import Navbar from '../Navbar/Navbar.jsx';
import Search from '../Search/Search.jsx';
import SearchResults from '../SearchResults/SearchResults.jsx';

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      artists: [],
    };
  }

  searchSuccess = (values) => {
    this.setState({artists: values.data});
  };

  searchFail = (err) => {
    console.log(err);
    toastr.info('', err.message);
    this.setState({artists: []});
  };

  handleLike = (artist) => {
    toastr.success('Love Like 4ever', `Great love to ${artist.name}`);
  };

  render() {
    return(
      <div>
        <Navbar />
        <div className="container">
          <Search
            className="home-search"
            onSubmitSuccess={this.searchSuccess}
            onSubmitFail={this.searchFail}
          />
          <SearchResults
            artists={this.state.artists}
            handleLike={this.handleLike}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    user: state.authUser.user,
  }),
  (dispatch) => bindActionCreators(actions, dispatch)
)(Homepage);