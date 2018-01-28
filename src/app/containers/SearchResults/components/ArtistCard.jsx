import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Heart } from 'react-feather';

class ArtistCard extends Component {

  handleLike = () => {
    this.props.handleLike(this.props.artist);
  };

  render() {
    return (
      <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>{this.props.artist.name}</CardTitle>
          <CardSubtitle><em>music style</em></CardSubtitle>
          <CardText>
            <em>Events list</em>
          </CardText>
          <div className="text-right">
            <button className="btn btn-primary align-middle" type="button" onClick={this.handleLike}><Heart/></button>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default ArtistCard;