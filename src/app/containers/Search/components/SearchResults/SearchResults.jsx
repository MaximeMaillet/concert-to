import React, {Component} from 'react';

import ArtistCard from '../../../../components/ArtistCard/ArtistCard.jsx';
import InfiniteScroll from 'react-infinite-scroller';

import './SearchResults.scss';

class SearchResults extends Component {
  render() {
    return(
      <div className={`search-results search-row ${this.props.className}`}>

        {(this.props.artists.length > 0 && (
          <InfiniteScroll
            pageStart={this.props.page}
            loadMore={this.props.onLoad}
            hasMore={true || false}
            loader={<div className="loader" key={0}>Loading ...</div>}
          >
            {this.props.artists.map((artist, id) => (
              <div className="search-col" key={id}>
                <ArtistCard
                  {...this.props}
                  artist={artist}
                />
              </div>
            ))}
          </InfiniteScroll>
        ))
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