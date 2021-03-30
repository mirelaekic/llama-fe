import {GET_PLACE_PHOTO,GET_PLACES,GET_PLACES_ERROR,GET_PLACES_LOADING, GET_PLACE_DETAILS} from "../types" 
import { placeDetails, placePhoto, places } from "../../utils/explore"

export const getPlaces = (lat,long) => {
    return async (dispatch) => {
        dispatch({type:GET_PLACES_LOADING})
        try {
            const place = await places(lat,long)
            console.log(place,"the place")
            dispatch({
                type:GET_PLACES,
                payload:place
            })
            // //  const photoRef = place.results.map((p) => p.photos ? p.photos[0].photo_reference : null)
            // //  console.log(photoRef,"the photo ref in explore.js______")
            // //  const photo = photoRef.forEach(element => {
            // //     dispatch(getPlacesPhoto(element))
            // //  });
            // // // const photo = photoRef.forEach(url => dispatch(getPlacesPhoto(url))) 
            // // console.log(photo, "photoURL for each place")
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
        dispatch({type:GET_PLACES_LOADING})
        try {
            const place = await placePhoto(refPhoto)
            dispatch({
                type:GET_PLACE_PHOTO,
                payload:place
            })
            console.log(place,"the place img")
        } catch (error) {
            console.log(error)
            dispatch({
                type:GET_PLACES_ERROR,
                payload:error
            })
        }
    } 
}