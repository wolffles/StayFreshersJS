import {
  ADD_FEEDBACK,
  GET_FEEDBACK,
  FEEDBACK_LOADING
} from '../actions/types';


const initialState = {
  feedback: [],
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type){
    case ADD_FEEDBACK:
      return {
        ...state,
        feedback: action.payload
      }
    case GET_FEEDBACK:
      return {
        ...state,
        feedback: action.payload,
        loading: false
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