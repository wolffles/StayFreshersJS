import React, { Component } from 'react'
// import propTypes from 'prop-types';
import {connect} from 'react-redux';

class TrainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  

  render() {
    return (
      <div className={"freshers m-2 " + this.props.face} onClick={this.props.onCardClick}>
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