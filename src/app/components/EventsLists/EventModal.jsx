import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

import Moment from 'moment';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import {Link, ShoppingBag} from 'react-feather';

import './Events.scss';
Moment.locale('fr');

export default class EventModal extends Component {

  static defaultValues = {
    event: {
      location: {}
    },
  };

  render() {
    if(!this.props.event || !this.props.event.location) {
      return (<div/>);
    }

    const getProvider = (x, y, z) => `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-sm"
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className="event-modal"
      >
        <ModalHeader toggle={this.props.toggle}>
          {this.props.event.name}
        </ModalHeader>
        <ModalBody>
          <div className="info">
            <div className="address">
              <span className="label">Name : </span>{this.props.event.name}<br />
              <span className="label">Address : </span>{this.props.event.location.address}<br />
              <span className="label">City : </span>{this.props.event.location.city}<br />
              <span className="label">Country : </span>{this.props.event.location.country}
            </div>
            <div className="links">
              {/*<a href="#"><Link size={15} /> More informations</a>*/}
              {/*<a href="#"><ShoppingBag size={15} /> Tickets</a>*/}
            </div>
          </div>
          <div className="map">
            <Map
              width={800}
              height={350}
              defaultCenter={[this.props.event.location.latitude, this.props.event.location.longitude]}
              defaultZoom={15}
              animate={true}
              provider={getProvider}
            >
              <Marker
                key={`marker_${this.props.event.location.name}`}
                anchor={[this.props.event.location.latitude, this.props.event.location.longitude]}
                payload={this.props.event.location.name}
              />
            </Map>
          </div>
        </ModalBody>
        <ModalFooter className="text-center">

        </ModalFooter>
      </Modal>
    );
  }
}