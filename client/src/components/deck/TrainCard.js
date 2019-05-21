import React, { Component } from 'react'
import PropTypes from 'prop-types';

class TrainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TorD:"term"
    }
    this.onClick= this.onClick.bind(this);
  }
  onClick(e){
    this.state.TorD === "term" ? this.setState({ TorD: "definition" }) : this.setState({ TorD: "term" })
  }
  render() {
    let fresher;
    if (this.state.TorD === "term") {
      fresher = <div className="term" onClick={this.onClick}><p>{this.props.card.term}</p></div>
    } else {
      fresher = <div className="definition" onClick={this.onClick}><p>{this.props.card.definition}</p></div>
    }
    return (
      <div className="freshers active">
          {/* { fresher } */}
        <div className="term" >{this.props.card.term}</div>
        <div className="definition" >{this.props.card.definition}</div>
      </div>
    )
  }
}

TrainCard.PropTypes = {
  
}

export default TrainCard