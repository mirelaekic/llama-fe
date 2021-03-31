import {GET_PLACE_DETAILS, GET_PLACE_PHOTO,GET_PLACES, GET_PLACES_ERROR, GET_PLACES_LOADING } from "../types"

const initialState = {
    places:[],
    loading:false,
    error:String,
    allPhotos:[],
    photo:{},
    singleResult:{}
}

export default function (state=initialState,action){
    switch (action.type) {
        case GET_PLACES_ERROR:
            return {
                ...state,
                error:action.payload,
                loading:false
            }
        case GET_PLACE_DETAILS:
            return {
                ...state,
                loading:false,
                singleResult:action.payload
            }
        case GET_PLACE_PHOTO:
            return {
                ...state,
                loading:false,
                photo:action.payload
            }
        case GET_PLACES_LOADING:
            return {
                ...state,
                loading:true
            }
        case GET_PLACES:
            return {
                ...state,
                loading:false,
                places:action.payload
            }
        default:
            return state
    }
}