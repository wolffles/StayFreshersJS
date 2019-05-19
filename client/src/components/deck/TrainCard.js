import React, { Component } from 'react'
import PropTypes from 'prop-types';

class TrainCard extends Component {
  render() {
    return (
      <div className="freshers">
          <div className="term">{this.props.card.term}</div>
          <div className="term definition">{this.props.card.definition}</div>
      </div>
    )
  }
}

TrainCard.PropTypes = {
  
}

export default TrainCard