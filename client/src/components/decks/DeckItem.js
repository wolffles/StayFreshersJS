import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteDeck, addLike, removeLike } from '../../actions/deckActions';

class DeckItem extends Component {
    onDeleteClick(id) {
        this.props.deleteDeck(id);
    }

    // onLikeClick(id) {
    //     this.props.addLike(id);
    // }

    // onUnlikeClick(id) {
    //     this.props.removeLike(id);
    // }

    findUserLike(likes) {
        const { auth } = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { deck, auth, showActions } = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        {/* <a href="profile.html">
                            <img
                                className="rounded-circle d-none d-md-block"
                                src={deck.avatar}
                                alt=""
                            />
                        </a>
                        <br /> */}
                        {/* <p className="text-center">{deck.subject}</p> */}
                    </div>
                    <div className="col-md-10">
                        <p className="text-center">{deck.subject}</p>
                        <p className="lead">{deck.description}</p>
                        {showActions ? (
                            <span>
                                <button
                                    // onClick={this.onLikeClick.bind(this, deck._id)}
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
                                    // onClick={this.onUnlikeClick.bind(this, deck._id)}
                                    type="button"
                                    className="btn btn-light mr-1"
                                >
                                    <i className="text-secondary fas fa-thumbs-down" />
                                </button>
                                <Link to={`/deck/${deck._id}`} className="btn btn-info mr-1">
                                    Comments
                </Link>
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
                </div>
            </div>
        );
    }
}

DeckItem.defaultProps = {
    showActions: true
};

DeckItem.propTypes = {
    deleteDeck: PropTypes.func.isRequired,
    // addLike: PropTypes.func.isRequired,
    // removeLike: PropTypes.func.isRequired,
    deck: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteDeck, addLike, removeLike })(
    DeckItem
);