import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Heart } from 'react-feather';
import 'flag-icon-css/sass/flag-icon.scss';
import './ArtistCard.scss';

import Moment from 'moment';
Moment.locale('fr');

class ArtistCard extends Component {
  handleLike = () => {
    this.props.handleLike(this.props.artist);
  };

  componentWillMount() {
    const now = new Date();
    this.props.artist.shortEvents = this.props.artist.events
      .map((event) => {
        event.date_start = Moment(new Date(event.date_start));
        event.date_end = Moment(new Date(event.date_end));
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
          <CardSubtitle><em>{this.props.artist.events.length} concert(s)</em></CardSubtitle>
          <ul className="list-events">
            {(this.props.artist.shortEvents &&
              this.props.artist.shortEvents.length > 0 &&
              this.props.artist.events.map((event, id) => (
                <li key={id} className="list-item-events">
                  <div className="country">
                    <span className={`flag-icon flag-icon-${event.location.country_code.toLowerCase()}`} />
                  </div>
                  <div className="info">
                    <span className="name">{event.name}</span>
                    <span className="date">{`${event.date_start.format('ddd Do MMMM YYYY')}`}</span>
                  </div>
                </li>
              ))
            )
            ||
            <div>No events</div>}
          </ul>
          <div className="text-right">
            <a href="javascript:">Plus ...</a>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default ArtistCard;