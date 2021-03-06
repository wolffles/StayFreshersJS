import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { addCard } from '../../actions/deckActions';
// import classnames from 'classnames';

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      definition: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.focusInput = React.createRef();
  }


  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const {_id} = this.props.deck

    const newCard = {
      term: this.state.term,
      definition: this.state.definition,
    };

    this.props.addCard(_id, newCard);
    this.setState({ 
      term: '' ,
      definition: ''
    });
    this.focusInput.current.focus();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    
    
    return (
        <div className="card card-info h-100">
          <div className="card-header mint-green">Create a card</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  refer={this.focusInput}
                  placeholder="Term"
                  name="term"
                  value={this.state.term}
                  onChange={this.onChange}
                  error={errors.term}
                  autofocus={true}
                /> 
                <TextAreaFieldGroup
                  className="text-area"
                  placeholder="Definition"
                  name="definition"
                  value={this.state.definition}
                  onChange={this.onChange}
                  error={errors.definition}
                />
              </div>
              <button type="submit" className="btn SF-green-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
    );
  }
}

AddCard.propTypes = {
  addCard: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { addCard })(AddCard);