import axios from 'axios';

import {
    ADD_DECK,
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_DECKS,
    GET_DECK,
    DECK_LOADING,
    DELETE_DECK,
    CLEAR_DECK,
    DECK_EDIT,
    STAY_FRESHER
} from './types';

// Add Deck
export const addDeck = (deckData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/decks', deckData)
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

//Add Card
export const addCard = (deck_id, cardData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/decks/card/${deck_id}`, cardData)
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
// Delete Comment
export const deleteCard = (deckId, cardId) => dispatch => {
    axios
        .delete(`/api/decks/card/${deckId}/${cardId}`)
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

// Get Decks
export const getDecks = (attribute='like_count', order=-1) => dispatch => {
    dispatch(setDeckLoading());
    axios
        .get(`/api/decks/${attribute}.${order}`)
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

export const getUserDecks = (user_id) => dispatch => {
    dispatch(setDeckLoading());
    axios
        .get(`/api/decks/user/${user_id}`)
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
export const toggleLike = id => dispatch => {
    axios
        .post(`/api/decks/like/${id}`)
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

export const toggleDislike = id => dispatch => {
    axios
        .post(`/api/decks/dislike/${id}`)
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

// Remove Like
export const removeLike = id => dispatch => {
    axios
        .post(`/api/decks/unlike/${id}`)
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
        .post(`/api/decks/comment/${deckId}`, commentData)
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



export const toggleEdit = () => {
    return {
        type: DECK_EDIT
    };
};

export const toggleFreshers = () => {
    return {
        type: STAY_FRESHER
    }
}

export const clearDeck = () => {
    return {
        type: CLEAR_DECK
    }
}

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};