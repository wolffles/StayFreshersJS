import React, { Component } from 'react'
// import propTypes from 'prop-types';
import {connect} from 'react-redux';

class TrainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
     termDef: false,
     face: ""
    }
    this.onClick= this.onClick.bind(this);
  }

  onClick(e){
    let face; 
    this.state.termDef ? face = '' : face = 'face'
    this.setState({termDef: !this.state.termDef, face: face})
  }


  
  render() {
    return (
      <div className={"freshers m-2 " + this.state.face} onClick={this.onClick}>
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