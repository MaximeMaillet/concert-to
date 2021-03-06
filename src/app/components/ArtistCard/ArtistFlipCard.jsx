import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Heart, Edit, ThumbsDown} from 'react-feather';
import {ReactFlipCard, Back, Front} from '../FlipCard/FlipCard.jsx';
import EventsList from '../EventsLists/EventsList.jsx';

import 'flag-icon-css/sass/flag-icon.scss';
import './ArtistFlipCard.scss';


export default class ArtistFlipCard extends Component {

  static propTypes = {
    artist: PropTypes.shape({
      events: PropTypes.array,
    })
  };

  static defaultValues = {
    artist: {
      events: [],
    },
    isLike: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      isLike: this.props.isLike
    };
  }

  flip = (e) => {
    e.preventDefault();
    this.setState({isFlipped: !this.state.isFlipped});
  }


  handleLike = () => {
    this.setState({isLike: !this.state.isLike});
    this.props.handleLike(this.props.artist);
  };

  handleDislike = () => {
    this.setState({isLike: !this.state.isLike});
    this.props.handleDislike(this.props.artist);
  };

  edit = () => {

  }

  render() {
    return (
      <ReactFlipCard isFlipped={this.state.isFlipped}>
        <Front>
          <Card className="artist-card">
            <div className="img" style={{
              backgroundImage: `url(${this.props.artist.logo})`,
            }}>
              <div className="actions">
                {(this.state.isLike &&
                  <button className="btn btn-transparent" type="button" onClick={this.handleDislike}><ThumbsDown /></button>
                )
                  ||
                  <button className="btn btn-transparent" type="button" onClick={this.handleLike}><Heart /></button>
                }

                {/*<button className="btn btn-transparent" type="button" onClick={this.edit}><Edit /></button>*/}
              </div>
            </div>
            <CardBody>
              <CardTitle>{this.props.artist.name}</CardTitle>
              <CardSubtitle><em>{this.props.artist.events.length} concert(s)</em></CardSubtitle>
              <EventsList
                events={this.props.artist.events}
                short={true}
              />
              <div className="text-right">
                <a href="javascript:" onClick={this.flip}>Plus ...</a>
              </div>
            </CardBody>
          </Card>
        </Front>

        <Back>
          <Card className="artist-card">
            <CardBody>
              <CardTitle>{this.props.artist.name}</CardTitle>
              <EventsList
                className="large"
                events={this.props.artist.events}
              />
              <div className="text-right">
                <a href="javascript:" onClick={this.flip}>Back</a>
              </div>
            </CardBody>
          </Card>
        </Back>
      </ReactFlipCard>
    );
  }
}

