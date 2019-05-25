import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getDecks} from '../../actions/deckActions';
import PropTypes from 'prop-types';
import SelectListGroup from '../common/SelectListGroup';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attribute: '',
      order: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.getDecks(this.state.attribute, this.state.order)
  }

  render() {


    const attributes = [
      { label: "Select an Atrribute", value: undefined },
      { label: "likes", value: 'likes' },
      { label: "dislikes", value: 'dislikes' },
      { label: "date", value: 'date' }
    ]

    const order = [
      { label: 'Select an order', value: undefined },
      { label: 'ASC, low-high', value: 1 },
      { label: 'DESC, high-low', value: -1 }
    ]
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <SelectListGroup
            placeholder='attribute'
            name='attribute'
            value={this.state.attribute}
            onChange={this.onChange}
            options={attributes}
            // error = {error.status}
            info='what attribute would you like to sort by'
          />
          <SelectListGroup
            placeholder='order'
            name='order'
            value={this.state.order}
            onChange={this.onChange}
            options={order}
            // error = {error.status}
            info='in what order'
          />
          <input
            type="submit"
            value="Submit"
            className="btn btn-info btn-block mt-4"
          />
        </form>
      </div>
    )
  }
}

Sort.propTypes = {
  getDecks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {getDecks})(Sort);