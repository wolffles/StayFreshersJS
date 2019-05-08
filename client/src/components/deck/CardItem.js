import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCard } from '../../actions/deckActions';
import EditCard from './EditCard'

class CardItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.onClick = this.onClick.bind(this);
    }
    onDeleteClick(deckId, cardId) {
        this.props.deleteCard(deckId, cardId);
    }

    onClick(){
        this.setState({ show: !this.state.show })
        console.log(this.state.show)
    }

    render() {
        const { card, deckId, deckUser, auth } = this.props;
        let cardButtons;
        let displayEdit = (this.state.show) ? <EditCard show={this.onClick} deckId={deckId} card={card}/> : null
        if (deckUser === auth.user.id ){
            cardButtons = (
                <div>
                    <button onClick={this.onClick}>edit</button>
                    <button
                        onClick={this.onDeleteClick.bind(this, deckId, card._id)}
                        type="button"
                        className="btn btn-danger mr-1"
                    >
                        <i className="fas fa-times" />
                    </button>
                </div>
            )
        }

        return (
            <div className="card card-body mb-3">
                <div className="row">            
                    <p>{card.term} : {card.definition}</p> 
                    {cardButtons}
                    {displayEdit}
                </div>
            </div>
        );
    }
}

CardItem.propTypes = {
    deleteCard: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    deckId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    deckUser: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteCard })(CardItem);