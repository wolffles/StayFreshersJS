import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteDeck, toggleLike, toggleDislike } from '../../actions/deckActions';

class DeckItem extends Component {
    onDeleteClick(id) {
        if (this.props.deck._id === '5cec273fac96612d49ea4b3c'){
            alert("You just had to try didn't you? You weren't the first one to try. haha")
        }else {
            this.props.deleteDeck(id);
        }
        
    }

    onLikeClick(id) {
        this.props.toggleLike(id);
    }

    onDislikeClick(id) {
        this.props.toggleDislike(id);
    }

    findUserLike(likes) {
        const { auth } = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { deck, auth, showActions, dashboard } = this.props;
        const likeDisBtns = (
            <div>
                <button
                    onClick={this.onLikeClick.bind(this, deck._id)}
                    type="button"
                    className="btn btn-light mr-1"
                >
                    <i
                        className={classnames('fas fa-thumbs-up', {
                            'text-info': this.findUserLike(deck.likes)
                        })}
                    />
                    <span className="badge badge-light">{deck.likes.length}</span>
                </button>
                <button
                    onClick={this.onDislikeClick.bind(this, deck._id)}
                    type="button"
                    className="btn btn-light mr-1"
                >
                    <i className="text-secondary fas fa-thumbs-down" />
                    <span className="badge badge-light">{deck.dislikes.length}</span>
                </button>
            </div>
        )
        return (
                <div className="card p-4 m-2 text-center">
                {/* <div className="row"> */}
                    {/* <div className="col">
                        <a href="profile.html">
                            <img
                                className="rounded-circle d-none d-md-block"
                                src={deck.avatar}
                                alt=""
                            />
                        </a>
                        <br />
                        <p className="text-center">{deck.subject}</p>
                    </div> */}
                <h2 className="subject font-weight-bold">{deck.subject}</h2>
                <p className="description">{deck.description}</p>
                <p className="card_count">card count: {deck.cards.length}</p>
                {showActions ? (
                    <span>
                        {dashboard ? "" : likeDisBtns}
                        <Link to={ `/deck/${deck._id}` } className="btn btn-info mr-1">
                            View
                        </Link>
                        {/* <Link to={`/deck/${deck._id}`} className="btn btn-info mr-1">
                            Comments
                        </Link> */}
                        {deck.user === auth.user.id ? (
                            <button
                                onClick={this.onDeleteClick.bind(this, deck._id)}
                                type="button"
                                className="btn btn-danger mr-1"
                            >
                                <i className="fas fa-times" />
                            </button>
                        ) : null}
                    </span>
                ) : null}
            </div>
            //     </div>
            // </div>
        );
    }
}

DeckItem.defaultProps = {
    showActions: true,
    dashboard: false
};

DeckItem.propTypes = {
    deleteDeck: PropTypes.func.isRequired,
    toggleLike: PropTypes.func.isRequired,
    toggleDislike: PropTypes.func.isRequired,
    // removeLike: PropTypes.func.isRequired,
    deck: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteDeck, toggleLike, toggleDislike })(
    DeckItem
);