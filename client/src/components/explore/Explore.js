import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getDecks} from '../../actions/deckActions'
import DeckFeed from '../deck/DeckFeed';
import Spinner from '../common/Spinner';
import Sort from './Sort';


class Decks extends Component {

    componentDidMount() {
        this.props.getDecks();
    }

    render() {
        const { decks, loading } = this.props.deck;
        let deckContent;

        if (decks === null || loading) {
            deckContent = <Spinner />;
        } else {
            deckContent = <DeckFeed decks={decks} />;
        }
        return (
                <div className="container">
                    <Sort />
                    <div className="deck-feed">
                        {deckContent}
                    </div>
                </div>
        );
    }
}

Decks.propTypes = {
    getDecks: PropTypes.func.isRequired,
    deck: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    deck: state.deck
});

export default connect(mapStateToProps, { getDecks })(Decks);