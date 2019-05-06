import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { addDeck, clearDeck } from '../../actions/deckActions';
// import AddCard from './AddCard'
import isEmpty from '../../validation/is-empty'

class EditDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount(){
    const { deck } = this.props.location.state;
    this.setState({
      subject: deck.subject,
      description: deck.subject
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  componentWillUnmount() {
    this.props.clearDeck();
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    const newDeck = {
      subject: this.state.subject,
      description: this.state.description,
      handle: profile.handle,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addDeck(newDeck);
    // this.setState({ Subject: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    let deckContent;
      deckContent = (
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <TextFieldGroup
              placeholder="Subject"
              name="subject"
              value={this.state.subject}
              onChange={this.onChange}
              error={errors.text}
            />
            <TextAreaFieldGroup
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.text}
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
                                </button>
        </form>)

    return (
      <div className="deck-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Create your deck</div>
          <div className="card-body">
            {deckContent}
          </div>
        </div>
      </div>
    );
  }
}

EditDeck.propTypes = {
  addDeck: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  clearDeck: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
  deck: state.deck
});

export default connect(mapStateToProps, { addDeck, clearDeck })(EditDeck);