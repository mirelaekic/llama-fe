import backend from "../token"
import axios from "axios"

require('dotenv').config()
const LLAMA_API = process.env.REACT_APP_LLAMA_API

export const getRooms = async () => {
    try {
        const rooms = await axios.get(`${LLAMA_API}rooms/me`,{ withCredentials:true})
        return rooms.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export const getSingleRoom = async (id) => {
    try {
        const room = await axios.get(`${LLAMA_API}rooms/${id}`,{ withCredentials:true})
        return room.data
    } catch (error) {
        console.log(error)
        return null
    }
}