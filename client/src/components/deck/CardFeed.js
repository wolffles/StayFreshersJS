import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem';

class CardFeed extends Component {
  render() {
    const { cards, deckId } = this.props;
    return cards.map(card => (
      <CardItem key={card._id} card={card} deckId={deckId} />
    ));
  }
}

CardFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  deck: PropTypes.object.isRequired
};

export default CardFeed;