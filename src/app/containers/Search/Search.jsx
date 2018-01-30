import React, {Component} from 'react';
import {toastr} from 'react-redux-toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../User/actions.js';
import api from '../../lib/api.js';

import SearchBar from './components/SearchBar/SearchBar.jsx';
import SearchResults from './components/SearchResults/SearchResults.jsx';
import Errors from '../Errors/Errors.jsx';

class Search extends Component {

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
    toastr.info('', err.message);
    this.setState({artists: []});
  };

  handleLike = (artist) => {

    api.like({id: artist.id})
      .then(() => {
        toastr.success('Love Like 4ever', `Great love to ${artist.name}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if(!this.props.user) {
      return (<Errors title="You are not authorized" />);
    }

    return(
      <div>
        <div className="container">
          <SearchBar
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
)(Search);