import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArtistCard from './components/ArtistCard.jsx';

class SearchResults extends Component {
  render() {
    return(
      <div className={`row row-eq-height search-results ${this.props.className}`}>
        {(this.props.artists.length > 0 && this.props.artists.map((artist, id) => (
          <div className="col-md-3" key={id}>
            <ArtistCard
              {...this.props}
              artist={artist}
            />
          </div>
        )))
        ||
        <div className="no-results">
          <h3>No results found</h3>
        </div>}
      </div>
    );
  }
}

export default SearchResults;