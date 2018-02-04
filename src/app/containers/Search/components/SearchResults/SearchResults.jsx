import React, {Component} from 'react';
import ArtistFlipCard from '../../../../components/ArtistCard/ArtistFlipCard.jsx';

import './SearchResults.scss';

class SearchResults extends Component {
  render() {
    return(
      <div className="search-results row row-eq-height">
        {(this.props.artists.length > 0 &&
          this.props.artists.map((artist, id) => (
            <div className="col-md-4 mb-5 col-search" key={id}>
              <ArtistFlipCard
                artist={artist}
              />
            </div>
          )))
        ||
          <div className="no-results">
            <h3>No results found</h3>
          </div>
        }
      </div>
    );
  }
}

export default SearchResults;