import {REMOVE_FROM_FAVOURITE,ADD_TO_FAVOURITE, GET_FAVOURITE,GET_PLACE_PHOTO,DETAILS_LOADING,GET_PLACES,PHOTO_LOADING,GET_PLACES_ERROR,GET_PLACES_LOADING, GET_PLACE_DETAILS} from "../types" 
import { placeDetails, placePhoto, places, addToFav, getFav, removeFromFav } from "../../utils/explore"

export const getPlaces = (lat,long,type) => {
    return async (dispatch) => {
        dispatch({type:GET_PLACES_LOADING})
        try {
            const place = await places(lat,long,type)
            dispatch({
                type:GET_PLACES,
                payload:place
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type:GET_PLACES_ERROR,
                payload:error
            })
        }
    } 
}
export const getSinglePlaceDetails = (placeId) => {
    return async (dispatch) => {
        try {
            dispatch({type:DETAILS_LOADING})
            const singlePlace = await placeDetails(placeId)
            dispatch({
                type:GET_PLACE_DETAILS,
                payload:singlePlace
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const getPlacesPhoto = (refPhoto) => {
    return async (dispatch) => {
        dispatch({type:PHOTO_LOADING})
        try {
            const place = await placePhoto(refPhoto)
            dispatch({
                type:GET_PLACE_PHOTO,
                payload:place
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type:GET_PLACES_ERROR,
                payload:error
            })
        }
    } 
}
export const getFavPlace = () => {
    return async (dispatch) => {
        try {
            const places = await getFav()
            dispatch({
                type:GET_FAVOURITE,
                payload:places
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const addFavPlace = (id,photoUrl) => {
    return async (dispatch) => {
        try {
            const place = await addToFav(id,photoUrl)
            dispatch({
                type:ADD_TO_FAVOURITE,
                payload:place
            })
            dispatch(getFavPlace())
        } catch (error) {
            console.log(error)
        }
    }
}
export const removeFavPlace = (id) => {
    return async (dispatch) => {
        try {
            const place = await removeFromFav(id)
            dispatch({
                type:REMOVE_FROM_FAVOURITE,
                payload:place
            })
            dispatch(getFavPlace())
        } catch (error) {
            console.log(error)
        }
    }
}
