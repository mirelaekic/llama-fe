import axios from "axios"
import backend from "../token"
const LLAMA_API = process.env.REACT_APP_LLAMA_API

// GET ALL COMMENTS
export const comments = async () => {
    try {
        const comments = await backend.get(`${LLAMA_API}comments/`,{ withCredentials:true})
        console.log(comments.data)
        return comments.data
    } catch (error) {
        console.log(error)
        return null
    }
}
// GET COMMENTS BY POST ID 
export const commentsById = async (id) => {
    try {
        const comments = await backend.get(`${LLAMA_API}comments/${id}`,{ withCredentials:true})
        return comments.data.length
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
export const postComment = async (id,comm) => { 
    try {
        let data = JSON.stringify({"comment":comm});
        let config = {
            withCredentials:true,
            method:"POST",
            url:`${LLAMA_API}comments/${id}`,
            headers: {'Content-Type': 'application/json'},
            data: data
        }
        const addComment = await backend(config)
        const comment = JSON.stringify(addComment.data)
        return comment.comment
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