import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import DeckForm from './DeckForm';
import DeckFeed from './DeckFeed';
import Spinner from '../common/Spinner';
import { getDecks } from '../../actions/deckActions';

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
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/* <DeckForm /> */}
                            {deckContent}
                        </div>
                    </div>
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