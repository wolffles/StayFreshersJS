import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeckItem from './DeckItem';

class DeckFeed extends Component {
    render() {
        const { decks, dashboard } = this.props;
        console.log("dash", dashboard)
        if (decks.length < 1){
            return <div> You haven't created anything! </div>
        }else{
            let statement;
            if (dashboard) {
                statement = (decks.map(deck => <DeckItem key={deck._id} deck={deck} dashboard={dashboard} />))
            } else {
                statement = ((decks.map(deck => <DeckItem key={deck._id} deck={deck} />)))
            }
            return statement
        }
    }
}

DeckFeed.defaultProp = {
    dashboard: false
}

DeckFeed.propTypes = {
    decks: PropTypes.array.isRequired
};

export default DeckFeed;