import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedbackItem from './FeedbackItem';

class FeedbackFeed extends Component {
  render() {
    const { feedback } = this.props;

    return feedback.map(item => (
      <FeedbackItem key={item._id} item={item} />
    ));
  }
}

FeedbackFeed.propTypes = {
  feedback: PropTypes.array.isRequired
};

export default FeedbackFeed;