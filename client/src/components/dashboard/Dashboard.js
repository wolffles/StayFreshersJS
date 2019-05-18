import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { getUserDecks } from '../../actions/deckActions';
import Spinner from '../common/Spinner';
import ProfileButtons from './ProfileButtons'
// import Experience from './Experience'
// import Education from './Education'
import DeckFeed from '../decks/DeckFeed'
class Dashboard extends Component {
  componentDidMount(){
    this.props.getCurrentProfile()
    this.props.getUserDecks(this.props.auth.user.id);
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { decks } = this.props.deck;
    

    let dashboardContent;
    if( profile == null || loading ) { 
      // if profile is loading
      dashboardContent = < Spinner/>
    } else if( Object.keys(profile).length > 0 ) {
      // Check if logged in user has profile data 
      dashboardContent = (
        <div>
          <div className="row">
            <h2 className=""> Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></h2>
            <ProfileButtons />
          </div>
          <div>
            <h3 className="text-center">Your Decks</h3>
            <div className="deck-feed">
              <DeckFeed decks={decks}/>
            </div>
          </div>
          <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger"> Delete My Account</button>
        </div>
      )
    }else {
      // User is logged in but has no profile 
      dashboardContent = (
        <div>
          <h2 className=""> Welcome { user.name }</h2>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
        </div>
      )
    }
    

    return (
      <div className="dashboard">
        <div className="container">
          <h1>Dashboard</h1>
          {dashboardContent}
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getUserDecks: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequried
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  deck: state.deck
})

export default connect(mapStateToProps, {getUserDecks, getCurrentProfile, deleteAccount})(Dashboard);