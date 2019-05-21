import axios from 'axios';

import{
  GET_FEEDBACK,
  ADD_FEEDBACK,
  GET_ERRORS,
  CLEAR_ERRORS,
  FEEDBACK_LOADING
} from './types'

export const addFeedback = (feedback) => dispatch =>{
  dispatch(clearErrors());

  axios
    .post('/api/actions', feedback)
    .then(res => 
      dispatch({
        type: ADD_FEEDBACK,
        payload: res.data
      })
  )
  .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  }))
};

export const getFeedback = () => dispatch => {
  dispatch(setFeedbackLoading());
  axios
    .get('/api/actions')
    .then(res => 
      dispatch({
        type: GET_FEEDBACK,
        payload: res.data
      })
  )
  .catch(err => dispatch({
    type: GET_FEEDBACK,
    payload: null
  }))
};

// Set loading state
export const setFeedbackLoading = () => {
  return {
    type: FEEDBACK_LOADING
  };
};


// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};