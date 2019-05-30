import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

  render() {
      let content;
      if (this.props.auth.isAuthenticated){
          content = (<div className="col-md-12 text-center">
              <h1 className="appName mb-4">StayFreshers</h1>
              <p className="lead text-muted"> A place where nerds are worshiped: create and share decks, become popular</p>
              <hr />
          </div>)
      }else{
          content = (<div className="col-md-12 text-center">
              <h1 className="appName mb-4">StayFreshers</h1>
              <p className="lead"> A place where nerds are worshiped: create and share decks, become popular</p>
              <hr />
              <Link to="/register" className="btn btn-lg SF-green-btn mr-2">Sign Up</Link>
              <Link to="/login" className="btn btn-lg btn-light">Login</Link>
          </div>)
      }
    return (
        <div className="landing">
                <div className="layout-container text-light">
                    <div className="row">
                        {/* <div className="col-md-12 text-center">
                            <h1 className="appName mb-4">StayFreshers</h1>
                            <p className="lead text-muted"> A place where nerds are worshiped: create and share decks, become popular</p>
                            <hr />
                            <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                            <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                        </div> */}
                        {content}
                    </div>
                </div>
            
        </div>
    )
  }
}
Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps)(Landing);