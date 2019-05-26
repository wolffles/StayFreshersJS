import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { addDeck, clearDeck, toggleEdit } from '../../actions/deckActions';

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
    const { deck } = this.props.deck
    this.setState({
      subject: deck.subject,
      description: deck.description
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const {deck} = this.props.deck
    const newDeck = {
      subject: this.state.subject,
      description: this.state.description,
      handle: deck.handle,
      name: user.name,
      avatar: user.avatar,
      deck_id: deck._id
    };

    this.props.addDeck(newDeck);
    this.setState({ subject: '', description: '' });
    this.props.toggleEdit();
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
          <div className="card-header bg-info text-white">Edit your deck</div>
          <div className="card-body">
            {deckContent}
          </div>
        </div>
      </div>
    );
  }
}

EditDeck.propTypes = {
  toggleEdit: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { toggleEdit, addDeck, clearDeck })(EditDeck);