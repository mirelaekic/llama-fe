import {GET_LIKES, LIKE_POST,UNLIKE_POST} from "../types" 
import {likeForPost,getLikesForPost} from "../../utils/likes"

export const getLikes = (id) => {
    return async (dispatch) => {
        try {
            const like = await getLikesForPost(id)
            dispatch({
                type:GET_LIKES,
                payload:like
            })
            console.log(like,"get likes result for this POST ID", id)
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
            dispatch(getLikes(id))
            console.log(like,"post like")
        } catch (error) {
            console.log(error)
        }
    }
}