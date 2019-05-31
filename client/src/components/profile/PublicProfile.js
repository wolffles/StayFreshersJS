import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProfileByUser} from '../../actions/profileActions';



class PublicProfile extends Component {
  
  componentDidMount(){
    this.props.getProfileByUser(this.props.user_id)
    console.log(this.props.profile)
  }
  
  render(){
    const {profile} = this.props.profile
    console.log(profile)
    let profileContent;
    if (profile.user){
      profileContent = (
      <div className="card-body deck-info text-center">
            <img
          className="rounded-circle card-img"
          src={profile.user.avatar}
          alt=""
        />
        <p>handle: {profile.handle}</p>
        <p>decks : {profile.decks.length}</p>
        <p>friends: {profile.friends.length}</p>

      </div>)
    }else{
      profileContent=(
      <div className="card-body">
        loading
      </div>
      )
    }
    return (
      <div>
        <div className="card card-info h-100">
          <div className="card-header mint-green">Author Info</div>
          {profileContent}
        </div>    
      </div>
    )
  }
}


PublicProfile.propTypes = {
  user_id: PropTypes.string.isRequired,
  getProfileByUser: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  deck: state.deck,
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByUser } )(PublicProfile);