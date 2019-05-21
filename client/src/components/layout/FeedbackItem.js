import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { deleteComment } from '../../actions/deckActions';

class CommentItem extends Component {
  // onDeleteClick(deckId, itemId) {
  //   this.props.deleteComment(deckId, itemId);
  // }

  render() {
    const { item, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={item.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{item.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{item.feedback}</p>
            {/* {item.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, deckId, item._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null} */}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  // deleteComment: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { })(CommentItem);