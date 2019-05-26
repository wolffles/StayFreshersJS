import React, { Component } from 'react'
// import propTypes from 'prop-types';
import {connect} from 'react-redux';

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
    // let fresher;
    // if (this.state.TorD === "term") {
    //   fresher = <div className={`flashcard term ${this.state.overflow_term}`} onClick={this.onClick}><p>{this.props.card.term}</p></div>
    // } else {
    //   fresher = <div className={`flashcard definition ${this.state.overflow_definition}`} onClick={this.onClick}><p>{this.props.card.definition}</p></div>
    // }
    return (
      <div className="freshers m-2">
        <div className={`term ${this.props.term}`} >{this.props.card.term}</div>
        <div className={`${this.props.definition} definition`} >{this.props.card.definition}</div>
        
      </div>
    )
  }
}
// 
// TrainCard.propTypes = {
// }
const mapStateToProps = state => ({

})

export default connect((mapStateToProps), {})(TrainCard);