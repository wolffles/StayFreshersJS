import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeckItem from './DeckItem';

class DeckFeed extends Component {
    render() {
        const { decks } = this.props;
        if (decks.length < 1){
            return <div> You haven't created anything! </div>
        }else{
            return decks.map(deck => <DeckItem key={deck._id} deck={deck} />);
        }
    }
}

DeckFeed.propTypes = {
    decks: PropTypes.array.isRequired
};

export default DeckFeed;