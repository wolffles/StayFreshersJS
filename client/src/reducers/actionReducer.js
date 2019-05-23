import {
  ADD_FEEDBACK,
  GET_FEEDBACK,
  FEEDBACK_LOADING,
  DELETE_FEEDBACK
} from '../actions/types';


const initialState = {
  feedback: [],
  item: {},
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type){
    case ADD_FEEDBACK:
      return {
        ...state,
        feedback: [action.payload,...state.feedback]
      }
    case GET_FEEDBACK:
      return {
        ...state,
        feedback: action.payload,
        loading: false
      }
    case DELETE_FEEDBACK:
      return {
        ...state,
        feedback: state.feedback.filter(item => item._id !== action.payload)
      }
    case FEEDBACK_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}