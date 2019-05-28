import React, { Component } from 'react';
import TrainCard from './TrainCard';
// import propTypes from 'prop-types';


class TrainDeck extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards:[],
      currentCard:{},
      index: 0,
      overflow_term: "",
      overflow_definition: "",
      face: '',
    }
    this.getPreviousCard = this.getPreviousCard.bind(this)
    this.getNextCard = this.getNextCard.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
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

  getPreviousCard(e) {
    let index = this.state.index
    
    if (this.state.index === 0){
      this.setState({
        currentCard: this.state.cards[this.state.cards.length - 1],
        index: this.state.cards.length - 1,
        overflow_term: this.overflow(this.state.cards[this.state.cards.length - 1].term),
        overflow_definition: this.overflow(this.state.cards[this.state.cards.length - 1].definition),
        face: this.state.face === 'face' ? this.toggleFace() : ''
      })
    }else
    this.setState({
      currentCard: this.state.cards[this.state.index -1],
      index: this.state.index-1,
      overflow_term: this.overflow(this.state.cards[index-1].term),
      overflow_definition: this.overflow(this.state.cards[index-1].definition),
      face: this.state.face === 'face' ? this.toggleFace() : ''
    })
  }

  getNextCard(e) {
    let index = this.state.index
    if (this.state.index + 1 > this.state.cards.length - 1) {
      this.setState({
        currentCard: this.state.cards[0],
        index: 0,
        overflow_term: this.overflow(this.state.cards[0].term),
        overflow_definition: this.overflow(this.state.cards[0].definition),
        face: this.state.face === 'face' ? this.toggleFace() : ''
      })
    } else
      this.setState({
        currentCard: this.state.cards[this.state.index + 1],
        index: this.state.index + 1,
        overflow_term: this.overflow(this.state.cards[index + 1].term),
        overflow_definition: this.overflow(this.state.cards[index + 1].definition),
        face: this.state.face === 'face' ? this.toggleFace() : ''
      })
  }

  toggleFace(bool){
    let face;
    this.state.face === "face" ? face = '' : face = 'face'
    if (bool){
      this.setState({face: face})
    }else{
      return face
    }
  }

  overflow(string) {
     return string.length > 140 ? "oversized" : "" 
  }
    
  onCardClick(e) {
    this.toggleFace(true)
    this.setState({ termDef: !this.state.termDef })
  }



  render() {
    return (
      <div className="freshers-container">
          <button className='btn freshers-back my-2' onClick={this.getPreviousCard}> &laquo; </button>
          <TrainCard term={this.state.overflow_term} definition={this.state.overflow_definition} face={this.state.face} card={this.state.currentCard} onCardClick={this.onCardClick}/>
          <button className='btn freshers-next my-2' onClick={this.getNextCard}> &raquo; </button>

          {/* <div className="freshers-control">
            <button className='btn freshers-next' onClick={this.getNextCard}>next</button>
          </div> */}
      </div>
    )
  }
}

TrainDeck.propTypes = {
}

export default TrainDeck;