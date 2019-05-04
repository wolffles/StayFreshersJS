import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
    render() {
        const { comments, deckId } = this.props;

        return comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} deckId={deckId} />
        ));
    }
}

CommentFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    deckId: PropTypes.string.isRequired
};

export default CommentFeed;