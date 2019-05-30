import React, { useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PublicProfile({user_id, deck, auth}) {
  const [user, setUser] = useState(user_id);
  console.log(user);
  console.log(deck);
  return (
    <div>
      new feature coming soon!
    </div>
  )
}


PublicProfile.propTypes = {
  user_id: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
  deck: state.deck,
  auth: state.auth
})

export default connect(mapStateToProps, {} )(PublicProfile);