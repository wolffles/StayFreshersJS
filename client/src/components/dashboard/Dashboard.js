import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { getUserDecks } from '../../actions/deckActions';
import Spinner from '../common/Spinner';
import ProfileButtons from './ProfileButtons';
import DeckFeed from '../deck/DeckFeed';
import {logoutUser} from '../../actions/authActions'
class Dashboard extends Component {
  componentDidMount(){
      this.props.getCurrentProfile()
      this.props.getUserDecks(this.props.auth.user.id);
  }

  onDeleteClick(e) {
    if (this.props.auth.user.id === "6274223bdece9300187afc65"){
      alert("Sorry deleting the demo account is not allowed")
    }else{
    this.props.deleteAccount();
    this.props.logoutUser()
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { decks } = this.props.deck;
    
    
    let dashboardContent;
    
    if( loading || profile === null) { 
      // if profile is loading
      dashboardContent = < Spinner/>
    } else if( Object.keys(profile).length > 0 ) {
      // Check if logged in user has profile data 
      dashboardContent = (
        <div>
          <div className="dash-header py-5 mint-green text-center">
            <h2 className=""> Welcome <Link className='link' to={`/profile/${profile.handle}`}>{user.name}</Link></h2>
            <div>
              <ProfileButtons />
            </div>
          </div>
          <div>
            <h2 className="mt-3 text-center">Your Decks</h2>
            <div className="deck-feed">
              <DeckFeed decks={decks} dashboard={true}/>
            </div>
          </div>
          <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger"> Delete My Account</button>
        </div>
      )
    }else {
      // User is logged in but has no profile 
      dashboardContent = (
        <div>
          <div className="py-3 mint-green">
            <h2 className=""> Welcome {user.name}</h2>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg SF-green-btn">Create Profile</Link>
          </div>
        </div>
      )
    }

    return (
      <div className="dashboard">
        <div className="container">
          {/* <h1>Dashboard</h1> */}
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
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  deck: state.deck
})

export default connect(mapStateToProps, {logoutUser, getUserDecks, getCurrentProfile, deleteAccount})(Dashboard);