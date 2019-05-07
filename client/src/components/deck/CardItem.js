import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCard } from '../../actions/deckActions';

class CardItem extends Component {
    onDeleteClick(deckId, cardId) {
        this.props.deleteCard(deckId, cardId);
    }

    render() {
        const { card, deckId, auth } = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">            
                    <p>{card.term} : {card.definition}</p> 
                        <button
                            onClick={this.onDeleteClick.bind(this, deckId, card._id)}
                            type="button"
                            className="btn btn-danger mr-1"
                        >
                            <i className="fas fa-times" />
                        </button>
                    {/* ) : null} */}
                </div>
            </div>
        );
    }
}

CardItem.propTypes = {
    deleteCard: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    deckId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteCard })(CardItem);