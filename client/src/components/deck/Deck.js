import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeckItem from './DeckItem';
import AddCard from './AddCard';
import TrainDeck from './TrainDeck';
// import CommentFeed from './CommentFeed';
import CardFeed from './CardFeed';
import Spinner from '../common/Spinner';
import { getDeck, toggleEdit, clearDeck, toggleFreshers } from '../../actions/deckActions';
import EditDeck from './EditDeck';
import PublicProfile from '../profile/PublicProfile'

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.onEditClick = this.onEditClick.bind(this);
        this.onFreshersClick = this.onFreshersClick.bind(this);
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
        if(this.props.deck.fresher === true){
            this.props.toggleFreshers();
        }
        this.props.clearDeck();
    }

    onEditClick(e) {
        this.props.toggleEdit();
    }

    onFreshersClick(e){
        this.props.toggleFreshers();
    }

    render() {
        const {deck, loading, edit, fresher } = this.props.deck;
        const { auth } = this.props
        let deckContent;
        if (deck === null || loading || Object.keys(deck).length === 0) {
            deckContent = <Spinner />;
        } else if(fresher === true){
            if (deck.cards.length > 0){
                deckContent = <TrainDeck deck={deck}/>
            }else {
                deckContent = "you dont have any cards to train"
            }
        }else{
            deckContent = (
                <div className="deck-view">
                    <div className="row mb-2">
                        <div className="col">
                            {edit ? <EditDeck deck={deck} /> :
                                <div className="card card-info h-100">
                                    <div className="card-header mint-green">Deck Info</div>
                                    <div className="card-body">
                                        <DeckItem deck={deck} showActions={false}/>
                                    </div>
                                </div>    
                            }
                        </div>
                        {(deck.user === auth.user.id) ? <div className="col"><AddCard deck={deck} /> </div> : <div className="col"><PublicProfile user_id={deck.user}/></div>}
                    </div>
                    <CardFeed deckId={deck._id} deckUser={deck.user} cards={deck.cards} />
                </div>
            );
        }
        // reactive edit and fresh buttons
        let editButton;
        let freshButton;
        if (deck.user === auth.user.id){ 
            if( edit === true ){ 
                editButton = (<button className="btn light mx-1 mb-3" onClick={this.onEditClick}>Cancel</button>) 
            } else {
                editButton = (<button className="btn light mx-1 mb-3" onClick={this.onEditClick}>Edit Deck</button>)
            }
        }
        if (edit === true) {
            freshButton = ''
        }   else {
            if (fresher === true) {
                freshButton = (<button className="btn btn-warning mx-1 mb-3" onClick={this.onFreshersClick}>Fresh Enough</button>)
                editButton = ''
            } else {
                freshButton = (<button className="btn mint-green-btn mx-1 mb-3" onClick={this.onFreshersClick}>Freshen Up</button>)
            }
        }
        return (
                <div className="container">
                    <div className="row">
                    <Link to="/dashboard" className="btn light text-dark mx-1 mb-3">
                            Back To Dashboard
                        </Link>
                        { editButton }
                        { freshButton }
                    </div>
                    { deckContent }
                </div>
        );
    }
}

Deck.propTypes = {
    clearDeck: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    toggleFreshers: PropTypes.func.isRequired,
    getDeck: PropTypes.func.isRequired,
    deck: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    deck: state.deck,
    auth: state.auth
});

export default connect(mapStateToProps, { clearDeck, getDeck, toggleEdit, toggleFreshers })(Deck);