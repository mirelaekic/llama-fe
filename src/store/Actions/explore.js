import {GET_PLACES,GET_PLACES_ERROR,GET_PLACES_LOADING} from "../types" 
import { places } from "../../utils/explore"

export const getPlaces = (lat,long) => {
    return async (dispatch) => {
        dispatch({type:GET_PLACES_LOADING})
        try {
            const place = await places(lat,long)
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