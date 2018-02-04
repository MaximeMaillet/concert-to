import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Heart} from 'react-feather';
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
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
  }

  flip = (e) => {
    e.preventDefault();
    this.setState({isFlipped: !this.state.isFlipped});
  }


  handleLike = () => {
    this.props.handleLike(this.props.artist);
  };

  render() {
    return (
      <ReactFlipCard isFlipped={this.state.isFlipped}>
        <Front>
          <Card className="artist-card">
            <div className="img" style={{
              backgroundImage: `url(${this.props.artist.logo})`,
            }}>
              <div className="actions">
                <button className="btn btn-transparent" type="button" onClick={this.handleLike}><Heart fill="#7d4627"/></button>
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

