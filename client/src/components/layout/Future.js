import React, { Component } from 'react'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import { addFeedback, getFeedback } from '../../actions/appActions'
import PropTypes from 'prop-types'
import FeedbackFeed from './FeedbackFeed';

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
    console.log(this.props.auth)
    console.log(this.props.profile)
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
    // console.log("actions", this.props.actions)
    return (
      <div className="future">
        <h1 className="text-center">Coming Soon</h1>
        <ul>
          <li>Users will be able to add friends</li>
          <li>Like peoples decks</li>
        </ul>


        <h1 className="text-center"> Leave some feed back</h1>
          <FeedbackFeed feedback={feedback} />
          <form onSubmit={this.onSubmit}>
            <TextAreaFieldGroup 
              placeholder="Is there Anything I can do to make your experience better?"
              name="feedback"
              value={this.state.feedback}
              onChange={this.onChange}
              error={errors.text}
            />
          <button type="submit" className="btn btn-dark">Submit</button>
          </form>
        
      </div>
    )
  }
}
Future.propTypes = {
  addFeedback: PropTypes.func.isRequired,
  getFeedback: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  actions: state.actions,
  profile: state.profile
})

export default connect(mapStateToProps, {addFeedback,getFeedback})(Future);