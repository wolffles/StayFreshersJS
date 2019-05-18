import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import CardItem from './CardItem';

class CardFeed extends Component {
  render() {
    const { cards, deckId, deckUser } = this.props;
    return cards.map(card => (
      <CardItem key={card._id} card={card} deckUser={deckUser} deckId={deckId} />
    ));
  }
}

// CardFeed.propTypes = {
// };

export default CardFeed;