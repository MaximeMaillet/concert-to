import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ArtistFlipCard from '../../../../components/ArtistCard/ArtistFlipCard.jsx';

import './SearchResults.scss';

class SearchResults extends Component {

  static propTypes = {
    likes: PropTypes.array
  };

  static defaultValues = {
    likes: []
  };

  render() {
    return(
      <div className="search-results row row-eq-height">
        {(this.props.artists.length > 0 &&
          this.props.artists.map((artist, id) => (
            <div className="col-md-4 mb-5 col-search" key={id}>
              <ArtistFlipCard
                artist={artist}
                isLike={this.props.likes.indexOf(artist.id) !== -1}
                handleLike={this.props.handleLike}
                handleDislike={this.props.handleDislike}
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