import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EventModal from './EventModal.jsx';
import Moment from 'moment';

import './Events.scss';
Moment.locale('fr');

export default class EventsList extends Component {
  static propTypes = {
    events: PropTypes.array
  };

  static defaultValues = {
    events: [],
    short: false
  };

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      event: null,
    };
  }

  componentWillMount(){
    this.events = this.props.events;
    const now = new Date();
    this.events = this.props.events
      .map((event) => {
        event.date_start = Moment(new Date(event.date_start));
        event.date_end = Moment(new Date(event.date_end));
        return event;
      })
      .filter((event) => {
        return now <= event.date_start;
      })
      .sort((eventA, eventB) => {
        if (eventA.date_start > eventB.date_start) return 1;
        else return -1;
      });

    if(this.props.short) {
      this.events = this.events.slice(0, 3);
    }
  }

  openModal = (event) => {
    this.toggle(event);
  }

  toggle = (event) => {
    this.setState({
      event: event ? event : null,
      modalOpen: !this.state.modalOpen
    });
  };

  render() {
    return (
      <div>
        <EventModal
          isOpen={this.state.modalOpen}
          toggle={this.toggle}
          event={this.state.event}
        />
        <ul className={`list-events ${this.props.className}`}>
          {(this.events.map((event, id) => (
            <li key={id} className="list-item-events" onClick={() => this.openModal(event)}>
              <div className="country">
                <span className={`flag-icon flag-icon-${event.location.country_code.toLowerCase()}`}/>
              </div>
              <div className="info">
                <span className="name">{event.name}</span>
                <span className="city">{event.location.city}</span>
                <span className="date">{`${event.date_start.format('ddd Do MMMM YYYY')}`}</span>
              </div>
            </li>
          ))
          )
          ||
          <div>No events</div>}
        </ul>
      </div>
    );
  }
}