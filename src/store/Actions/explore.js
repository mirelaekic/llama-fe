import {GET_PLACE_PHOTO,DETAILS_LOADING,GET_PLACES,PHOTO_LOADING,GET_PLACES_ERROR,GET_PLACES_LOADING, GET_PLACE_DETAILS} from "../types" 
import { placeDetails, placePhoto, places } from "../../utils/explore"

export const getPlaces = (lat,long,type) => {
    return async (dispatch) => {
        dispatch({type:GET_PLACES_LOADING})
        try {
            console.log(type,"the type")
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
            console.log(singlePlace,"single place details")
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
            console.log(place,"the response for img")
        } catch (error) {
            console.log(error)
            dispatch({
                type:GET_PLACES_ERROR,
                payload:error
            })
        }
    } 
}