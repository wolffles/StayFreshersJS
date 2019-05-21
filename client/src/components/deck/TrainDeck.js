import React, { Component } from 'react';
import TrainCard from './TrainCard';
import PropTypes from 'prop-types';


class TrainDeck extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards:[],
      currentCard:{},
      index: 0
    }

    this.getNextCard = this.getNextCard.bind(this);
  }

  componentWillMount(){
    const {deck} = this.props
    this.setState({
      cards: deck.cards,
      currentCard: this.getRandomCard(deck.cards)
    })
  }

  getRandomCard(array) {
    let card = array[Math.floor(Math.random() * array.length)]
    let index = array.findIndex(element => element === card)
    this.setState({
      index: index
    })
    return (card)
  }  

  getNextCard(e) {
    if (this.state.index + 1 > this.state.cards.length-1){
      this.setState({
        currentCard: this.state.cards[0],
        index: 0
      })
    }else
    this.setState({
      currentCard: this.state.cards[this.state.index +1],
      index: this.state.index+1
    })
  }

 
    

  render() {
    console.log(this.state)
    return (
      <div className="freshers-contianer">
          <TrainCard card={this.state.currentCard} />
          <div className="freshers-control">
            <button className='btn freshers-next' onClick={this.getNextCard}>next</button>
          </div>
      </div>
    )
  }
}

TrainDeck.PropTypes = {
}

export default TrainDeck;