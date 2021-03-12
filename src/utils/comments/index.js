import axios from "axios"

const {LLAMA_API} = process.env

// GET COMMENTS BY POST ID  
export const comments = async (id) => {
    try {
        const comments = await axios.get(`${LLAMA_API}comments/${id}`,{ withCredentials:true})
        console.log(comments)
        return comments.data
    } catch (error) {
        console.log(error)
        return null
    }
}
// GET SINGLE COMMENT
export const comment = async (id) => {
    try {
        const comment = await axios.get(`${LLAMA_API}comments/comment/${id}`,{ withCredentials:true})
        console.log(comment)
        return comment.data
    } catch (error) {
        console.log(error)
        return null
    }
}
// POST COMMENT
export const postComment = async (id,data) => {
    try {
        const comment = await axios.post(`${LLAMA_API}comments/${id}`,data,{ withCredentials:true})
        console.log(comment)
        return comment.data
    } catch (error) {
        console.log(error)
        return null
    }
}

// EDIT COMMENT
export const editComment = async (id,data) => {
    try {
        const comment = await axios.put(`${LLAMA_API}comments/${id}`,data,{ withCredentials:true})
        console.log(comment)
        return comment.data
    } catch (error) {
        console.log(error)
        return null
    }
}
//DELETE COMMENT
export const deleteComment = async (id) => {
    try {
        const comment = await axios.delete(`${LLAMA_API}comments/${id}`,{ withCredentials:true})
        console.log(comment)
        return comment.data
    } catch (error) {
        console.log(error)
        return null
    }
}