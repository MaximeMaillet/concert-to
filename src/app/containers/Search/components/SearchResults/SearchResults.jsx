import React, {Component} from 'react';

import ArtistCard from '../../../../components/ArtistCard/ArtistCard.jsx';

class SearchResults extends Component {
  render() {
    return(
      <div className={`row row-eq-height search-results ${this.props.className}`}>
        {(this.props.artists.length > 0 && this.props.artists.map((artist, id) => (
          <div className="col-md-4 mb-4" key={id}>
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