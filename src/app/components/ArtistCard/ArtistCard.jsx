import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Heart } from 'react-feather';

import Moment from 'moment';
Moment.locale('fr');

import './ArtistCard.scss';

class ArtistCard extends Component {

  constructor(props) {
    super(props);
    // if(props.artist && props.artist.Events && props.artist.Events.length > 0) {
    //   props.artist.Events.sort((a,b) => {
    //     const dA = new Date(a.date_start);
    //     const dB = new Date(b.date_start);
    //
    //     if (dA < dB) return -1;
    //     else if(dA > dB) return  1;
    //     else return  0;
    //   });
    // }
  }

  handleLike = () => {
    this.props.handleLike(this.props.artist);
  };

  componentWillMount() {
    const now = new Date();
    this.props.artist.events = this.props.artist.events
      .map((event) => {
        event.date_start = new Date(event.date_start);
        event.date_end = new Date(event.date_end);
        return event;
      })
      .filter((event) => {
        return now <= event.date_start;
      })
      .sort((eventA, eventB) => {
        if(eventA.date_start > eventB.date_start) return 1;
        else return -1;
      })
      .slice(0, 3);
  }


  render() {
    return (
      <Card className="artist-card">
        <div className="img">
          <img
            width="100%"
            src={this.props.artist.logo}
            alt="Card image cap"
            className="card-img-top" />
          <button className="btn btn-transparent" type="button" onClick={this.handleLike}><Heart fill="#7d4627"/></button>
        </div>
        <CardBody>
          <CardTitle>{this.props.artist.name}</CardTitle>
          <CardSubtitle><em>music style</em></CardSubtitle>
          <ul className="list-group">
            {(this.props.artist.events.length > 0 && this.props.artist.events.map((event, id) => (
              <li key={id} className="list-group-item list-group-events">
                <span className="date">{`${event.date_start.getUTCDate()}/${event.date_start.getMonth()+1}/${event.date_start.getFullYear()}`}</span>
                <span className="name">{event.name}</span>
              </li>
            )))
            ||
            <div>No events</div>}
          </ul>
        </CardBody>
      </Card>
    );
  }
}

export default ArtistCard;