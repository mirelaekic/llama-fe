import {GET_LIKES, LIKE_POST,UNLIKE_POST} from "../types" 
import {likeForPost,getLikesForPost, getAllLikes} from "../../utils/likes"

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