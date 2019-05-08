import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { addCard } from '../../actions/deckActions';

class EditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      definition: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { card } = this.props
    this.setState({
      term: card.term,
      definition: card.definition
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { deckId } = this.props
    const { card } = this.props
    const newCard = {
      term: this.state.term,
      definition: this.state.definition,
      card_id: card._id
    };

    this.props.addCard(deckId, newCard);
    this.setState({
      term: '',
      definition: ''
    });
    this.props.show();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;


    return (
      <div className="deck-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Edit a card</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Term"
                  name="term"
                  value={this.state.term}
                  onChange={this.onChange}
                  error={errors.text}
                />
                <TextAreaFieldGroup
                  placeholder="Definition"
                  name="definition"
                  value={this.state.definition}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditCard.propTypes = {
  addCard: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { addCard })(EditCard);