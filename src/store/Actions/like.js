import {GET_LIKES, LIKE_POST,REMOVE_FROM_FAVOURITE,ADD_TO_FAVOURITE,UNLIKE_POST} from "../types" 
import {likeForPost,getLikesForPost,removeFromFav,addToFav, getAllLikes} from "../../utils/likes"

export const getLikes = () => {
    return async (dispatch) => {
        try {
            const like = await getAllLikes()
            dispatch({
                type:GET_LIKES,
                payload:like
            })
        } catch (error) {
            console.log(error)
        }
    } 
}
export const likePost = (id) => {
    return async (dispatch) => {
        try {
            const like = await likeForPost(id)
            dispatch({
                type:LIKE_POST,
                payload:like
            })
            dispatch(getLikes())
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
        } catch (error) {
            console.log(error)
        }
    }
}
