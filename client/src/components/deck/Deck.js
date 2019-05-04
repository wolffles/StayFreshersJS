import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeckItem from '../decks/DeckItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getDeck } from '../../actions/deckActions';

class Deck extends Component {
    componentDidMount() {
        this.props.getDeck(this.props.match.params.id);
    }

    render() {
        const { deck, loading } = this.props.deck;
        let deckContent;

        if (deck === null || loading || Object.keys(deck).length === 0) {
            deckContent = <Spinner />;
        } else {
            deckContent = (
                <div>
                    <DeckItem deck={deck} showActions={false} />
                    <CommentForm deckId={deck._id} />
                    <CommentFeed deckId={deck._id} comments={deck.comments} />
                </div>
            );
        }

        return (
            <div className="deck">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">
                                Back To Feed
                            </Link>
                            {deckContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Deck.propTypes = {
    getDeck: PropTypes.func.isRequired,
    deck: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    deck: state.deck
});

export default connect(mapStateToProps, { getDeck })(Deck);