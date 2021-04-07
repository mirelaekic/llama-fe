import axios from "axios"
import backend from "../token"
const LLAMA_API = process.env.REACT_APP_LLAMA_API
// LIKE/DISLIKE POST 
export const likeForPost = async (id) => {
    try {
        const like = await backend.post(`${LLAMA_API}like/${id}`,{ withCredentials:true})
        //console.log(like, "LIKE DATA")
        return like.data
    } catch (error) {
        console.log(error)
        return null
    }
}
// GET LIKES FOR THE POST 
export const getLikesForPost = async (id) => {
    try {
        const likes = await backend.get(`${LLAMA_API}like/${id}`,{ withCredentials:true})
        console.log(likes, "GETTING LIKES DATA")
        return likes.data
    } catch (error) {
        console.log(error)
        return null
    }
}
//GET ALL LIKES
export const getAllLikes = async () => {
    try {
        const likes = await backend.get(`${LLAMA_API}like/`,{ withCredentials:true})
        //console.log(likes, "GETTING LIKES DATA")
        return likes.data
    } catch (error) {
        console.log(error)
        return null
    }
}

// POST PLACE ID TO FAVOURITE ARRAY 
export const addToFav = async (cityId) => {
    try {
        const fav = await backend.post(`${LLAMA_API}like/favourite/${cityId}`,{ withCredentials:true})
        console.log(fav, "posting id to fav array")
        return fav.data
    } catch (error) {
        console.log(error)
        return null
    }
}
// REMOVE PLACE ID FROM FAVOURITE ARRAY 
export const removeFromFav = async (cityId) => {
    try {
        const fav = await backend.post(`${LLAMA_API}like/removeFav/${cityId}`,{ withCredentials:true})
        console.log(fav, "removing id from fav array")
        return fav.data
    } catch (error) {
        console.log(error)
        return null
    }
}