import {
    LIKE_COMMENT,
    LIKE_COMMENT_ERROR,
    LIKE_POST,
    LIKE_POST_ERROR,
    UNLIKE_POST,
    GET_LIKES
} from "../types"

const initialState = {
    like:Boolean,
    isLiked: [],
    likeLength:null,
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
        default:
            return state
    }
}