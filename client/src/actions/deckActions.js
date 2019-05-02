import axios from 'axios';

import {
    ADD_DECK,
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_DECKS,
    GET_DECK,
    DECK_LOADING,
    DELETE_DECK
} from './types';

// Add Deck
export const addDeck = deckData => dispatch => {
    dispatch(clearErrors());
    axios
        .deck('/api/decks', deckData)
        .then(res =>
            dispatch({
                type: ADD_DECK,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Get Decks
export const getDecks = () => dispatch => {
    dispatch(setDeckLoading());
    axios
        .get('/api/decks')
        .then(res =>
            dispatch({
                type: GET_DECKS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_DECKS,
                payload: null
            })
        );
};

// Get Deck
export const getDeck = id => dispatch => {
    dispatch(setDeckLoading());
    axios
        .get(`/api/decks/${id}`)
        .then(res =>
            dispatch({
                type: GET_DECK,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_DECK,
                payload: null
            })
        );
};

// Delete Deck
export const deleteDeck = id => dispatch => {
    axios
        .delete(`/api/decks/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_DECK,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add Like
export const addLike = id => dispatch => {
    axios
        .deck(`/api/decks/like/${id}`)
        .then(res => dispatch(getDecks()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Remove Like
export const removeLike = id => dispatch => {
    axios
        .deck(`/api/decks/unlike/${id}`)
        .then(res => dispatch(getDecks()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add Comment
export const addComment = (deckId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .deck(`/api/decks/comment/${deckId}`, commentData)
        .then(res =>
            dispatch({
                type: GET_DECK,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete Comment
export const deleteComment = (deckId, commentId) => dispatch => {
    axios
        .delete(`/api/decks/comment/${deckId}/${commentId}`)
        .then(res =>
            dispatch({
                type: GET_DECK,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set loading state
export const setDeckLoading = () => {
    return {
        type: DECK_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};