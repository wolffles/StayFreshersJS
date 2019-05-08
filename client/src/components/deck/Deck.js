import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeckItem from '../decks/DeckItem';
import AddCard from './AddCard';
// import CommentFeed from './CommentFeed';
import CardFeed from './CardFeed';
import Spinner from '../common/Spinner';
import { getDeck, toggleEdit, clearDeck } from '../../actions/deckActions';
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
        this.props.clearDeck();
    }

    onClick(e) {
        this.props.toggleEdit();
    }

    render() {
        const {deck, loading, edit } = this.props.deck;
        const { auth } = this.props
        let deckContent;
        if (deck === null || loading || Object.keys(deck).length === 0) {
            deckContent = <Spinner />;
        } else if( edit === true){
            deckContent = <EditDeck deck={deck}/>
        }else{
            deckContent = (
                <div>
                    <DeckItem deck={deck} showActions={false} />
                    {(deck.user === auth.user.id) ? <AddCard deck={deck} /> : null }
                    <CardFeed deckId={deck._id} deckUser={deck.user} cards={deck.cards} />
                </div>
            );
        }
        let editButton;
        if (deck.user === auth.user.id){ 
            editButton = edit === true ? "" : (<button className="btn btn-light mb-3" onClick={this.onClick}>Edit Deck</button>)
        }
        return (
            <div className="deck">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/dashboard" className="btn btn-light mb-3">
                                Back To dashboard
                            </Link>
                            { editButton }
                            {deckContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Deck.propTypes = {
    clearDeck: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    getDeck: PropTypes.func.isRequired,
    deck: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    deck: state.deck,
    auth: state.auth
});

export default connect(mapStateToProps, { clearDeck, getDeck, toggleEdit })(Deck);