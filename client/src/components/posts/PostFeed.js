import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeckItem from './DeckItem';

class DeckFeed extends Component {
    render() {
        const { decks } = this.props;

        return decks.map(deck => <DeckItem key={deck._id} deck={deck} />);
    }
}

DeckFeed.propTypes = {
    decks: PropTypes.array.isRequired
};

export default DeckFeed;