import axios from "axios"

const {LLAMA_API} = process.env

// LIKE/DISLIKE POST 
export const like = async (id) => {
    try {
        const like = await axios.post(`${LLAMA_API}like/${id}`,{ withCredentials:true})
        console.log(like)
        return like.data
    } catch (error) {
        console.log(error)
        return null
    }
}
// GET LIKES FOR ONE POST 
export const likes = async (id) => {
    try {
        const likes = await axios.get(`${LLAMA_API}like/${id}`,{ withCredentials:true})
        console.log(likes)
        return likes.data
    } catch (error) {
        console.log(error)
        return null
    }
}