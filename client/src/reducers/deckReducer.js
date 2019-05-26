import {
    ADD_DECK,
    GET_DECKS,
    GET_DECK,
    DELETE_DECK,
    DECK_LOADING,
    DECK_EDIT,
    CLEAR_DECK,
    STAY_FRESHER
} from '../actions/types';

const initialState = {
    decks: [],
    deck: {},
    loading: false,
    edit: false,
    fresher: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DECK_LOADING:
            return {
                ...state,
                loading: true
            };
        case DECK_EDIT:
            return {
                ...state,
                edit: !state.edit
            }
        case STAY_FRESHER:
            return {
                ...state,
                fresher: !state.fresher
            }
        case GET_DECKS:
            return {
                ...state,
                decks: action.payload,
                loading: false
            };
        case GET_DECK:
            return {
                ...state,
                deck: action.payload,
                loading: false
            };
        case ADD_DECK:
            return {
                ...state,
                decks: state.decks.map(ele => ele._id === action.payload._id ? action.payload : ele),
                deck: action.payload
            };
        case DELETE_DECK:
            return {
                ...state,
                decks: state.decks.filter(deck => deck._id !== action.payload)
            };
        case CLEAR_DECK:
            return {
                ...state,
                deck: {}
            };
        default:
            return state;
    }
}