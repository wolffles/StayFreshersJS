import React, { Component } from 'react'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import { addFeedback, getFeedback } from '../../actions/actionActions'
import PropTypes from 'prop-types'
import FeedbackFeed from './FeedbackFeed';
import {getCurrentProfile} from '../../actions/profileActions';

class Future extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    this.props.getFeedback()
    if (this.props.auth) {
      this.props.getCurrentProfile()
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const {user} = this.props.auth;
    const {profile} = this.props.profile
    const newFeedback = {
      feedback: this.state.feedback,
      name: user.name,
      avatar: user.avatar,
      handle: profile.handle
    }

    this.props.addFeedback(newFeedback);
    this.setState({feedback: ''})
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    const { feedback } = this.props.actions

    return (
      <div className="future">
        <h2 className="text-center">News on the new new</h2>
        <ul className="feedback mb-4 text-center">
          <li>Better Profile features</li>
          <li>The ability to add friends</li>
          <li>Comment on decks</li>
          <li>Clone a deck to own the deck</li>
        </ul>


        <h2 className="text-center"> Love/Hate it? Got bugs? Leave some feedback </h2>
          <FeedbackFeed feedback={feedback} />
        <form onSubmit={this.onSubmit} className="feedback">
            <TextAreaFieldGroup 
              placeholder="Is there anything I can do to make your experience better?"
              name="feedback"
              value={this.state.feedback}
              onChange={this.onChange}
              error={errors.text}
            />
          <button type="submit" className="btn SF-green">Submit</button>
          </form>
        
      </div>
    )
  }
}
Future.propTypes = {
  addFeedback: PropTypes.func.isRequired,
  getFeedback: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  actions: state.actions,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, addFeedback, getFeedback})(Future);