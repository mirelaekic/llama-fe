import {
    LIKE_COMMENT,
    LIKE_COMMENT_ERROR,
    LIKE_POST,
    LIKE_POST_ERROR,
    UNLIKE_POST,
    GET_LIKES,
    GET_FAVOURITE,
    ADD_TO_FAVOURITE,
    REMOVE_FROM_FAVOURITE
} from "../types"

const initialState = {
    like:Boolean,
    isLiked: [],
    likeLength:null,
    favourite:[]
}

export default function (state = initialState,action){
    switch (action.type) {
        case LIKE_POST:
            return {
                ...state,
                like:action.payload
            }
        case GET_LIKES:
            return {
                ...state,
                isLiked:action.payload
            }
        case GET_FAVOURITE:
            return {
                ...state,
                favourite:action.payload
            }
        case ADD_TO_FAVOURITE:
            return {
                ...state,
                favourite:action.payload
            }
        case REMOVE_FROM_FAVOURITE:
            return {
                ...state,
                favourite:action.payload
            }
        default:
            return state
    }
}