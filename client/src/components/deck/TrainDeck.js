import React, { Component } from 'react';
import TrainCard from './TrainCard';
import propTypes from 'prop-types';


class TrainDeck extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards:[],
      currentCard:{},
      index: 0,
      overflow_term: "",
      overflow_definition: ""
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
      index: index,
      currentCard: array[index],
      overflow_term: this.overflow(array[index].term),
      overflow_definition: this.overflow(array[index].definition)
    })
    return (card)
  }  

  getNextCard(e) {
    const index = this.state.index
    if (this.state.index + 1 > this.state.cards.length-1){
      this.setState({
        currentCard: this.state.cards[0],
        index: 0,
        overflow_term: this.overflow(this.state.cards[0].term),
        overflow_definition: this.overflow(this.state.cards[0].definition)
      })
    }else
    this.setState({
      currentCard: this.state.cards[this.state.index +1],
      index: this.state.index+1,
      overflow_term: this.overflow(this.state.cards[index].term),
      overflow_definition: this.overflow(this.state.cards[index].definition)
    })
  }

  overflow(string) {
     return string.length > 130 ? "oversized" : "" 
  }
    

  render() {
    return (
      <div className="freshers-contianer">
          <TrainCard term={this.state.overflow_term} definition={this.state.overflow_definition} card={this.state.currentCard} />
          <div className="freshers-control">
            <button className='btn freshers-next' onClick={this.getNextCard}>next</button>
          </div>
      </div>
    )
  }
}

TrainDeck.propTypes = {
}

export default TrainDeck;