import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getDecks} from '../../actions/deckActions';
import PropTypes from 'prop-types';
// import SelectListGroup from '../common/SelectListGroup';

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
    // const attributes = [
    //   { label: "Select an Atrribute", value: undefined },
    //   { label: "likes", value: 'likes' },
    //   { label: "dislikes", value: 'dislikes' },
    //   { label: "date", value: 'date' }
    // ]

    // const order = [
    //   { label: 'Select an order', value: undefined },
    //   { label: 'ASC, low-high', value: 1 },
    //   { label: 'DESC, high-low', value: -1 }
    // ]
    return (
      <span className="sort">
        {/* <form className="form-inline" onSubmit={this.onSubmit}>
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
            className="btn SF-green-btn btn mt-4"
          />
        </form> */}
        <form className="input-group mb-2" onSubmit={this.onSubmit}>
          <select className="col" name='attribute' value={this.state.attribute} onChange={this.onChange}>
            <option className='options' value="">Select an attribute</option>
            <option value="date">Date</option>
            <option value="like_count">Likes</option>
            {/* <option value="dislikes">Dislikes</option> */}
          </select>
          <select className="col" name="order" value={this.state.order} onChange={this.onChange}>
            <option value="">Select an order</option>
            <option value="1">ASC, low-high</option>
            <option value="-1">DESC, high-low</option>
          </select>
          <input
            type="submit"
            value="Submit"
            className="btn SF-green-btn h4"
          />
        </form>
      </span>
    )
  }
}

Sort.propTypes = {
  getDecks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {getDecks})(Sort);