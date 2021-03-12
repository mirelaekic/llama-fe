import {POST_ERROR,POST_LOADING,POSTS_SUCCESS,ALL_POSTS,MY_POSTS} from "../types"

const initialState = {
    myPosts:[],
    allPosts:[],
    loading:false,
    error:""
}   

export default function (state=initialState,action) {
    switch(action.type) {
        case POST_ERROR:
            return {
                ...state,
                error:"We aplogize, something went wrong"
            }
        case POST_LOADING:
            return {
                ...state,
                loading:true,
            }
        case POSTS_SUCCESS:
            return {
                ...state,
                allPosts: action.payload
            }
        case MY_POSTS:
            return {
                ...state,
                myPosts: action.payload
            }
        default:
            return state;
    }
}