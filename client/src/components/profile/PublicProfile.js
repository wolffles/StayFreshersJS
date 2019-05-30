import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PublicProfile extends Component {
  const [user, setUser] = useState(this.props.user_id);

  render() {
      const {user_id} = this.props
    console.log(user)
    return (
      <div>
        
      </div>
    )
  }
}

PublicProfile.propTypes = {
  user_id: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
  // deck: state.deck,
  // auth: state.auth
})

export default connect(mapStateToProps, {} )(PublicProfile);