import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeckItem from '../decks/DeckItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getDeck, toggleEdit } from '../../actions/deckActions';
import EditDeck from './EditDeck';

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.onClick = this.onClick.bind(this);
    }

    componentWillMount(){
        if(this.props.match.params.id){
            this.props.getDeck(this.props.match.params.id)
        }
    }
    componentWillUnmount(){
        if(this.props.deck.edit === true){
            this.props.toggleEdit();
        }
    }

    onClick(e) {
        this.props.toggleEdit();
    }

    render() {
        const {deck, loading, edit } = this.props.deck;
        let deckContent;
        if (deck === null || loading || Object.keys(deck).length === 0) {
            deckContent = <Spinner />;
        } else if( edit === true){
            deckContent = <EditDeck deck={deck}/>
        }else{
            deckContent = (
                <div>
                    <DeckItem deck={deck} showActions={false} />
                    <CommentForm deckId={deck._id} />
                    <CommentFeed deckId={deck._id} comments={deck.comments} />
                </div>
            );
        }
        let editButton;
        editButton = edit === true ? "" : (<button onClick={this.onClick}>edit</button>)
        return (
            <div className="deck">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/dashboard" className="btn btn-light mb-3">
                                Back To dashboard
                            </Link>
                            {editButton}
                            {deckContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Deck.propTypes = {
    toggleEdit: PropTypes.func.isRequired,
    getDeck: PropTypes.func.isRequired,
    deck: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    deck: state.deck
});

export default connect(mapStateToProps, { getDeck, toggleEdit })(Deck);