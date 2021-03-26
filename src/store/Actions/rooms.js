import {GET_ROOMS,ERROR_ROOMS, GET_ROOM} from "../types"
import {getRooms, getSingleRoom} from "../../utils/chat"

export const getAllRooms = () => {
    return async (dispatch) => {
        try {
            const allRooms = await getRooms()
            dispatch({
                type:GET_ROOMS,
                payload:allRooms
            })
            console.log(allRooms,"all fetched rooms")
        } catch (error) {
            console.log(error)
            dispatch({type:ERROR_ROOMS})
        }
    }
}
export const getOneRoom = (id) => {
    return async (dispatch) => {
        try {
            const room = await getSingleRoom(id)
            dispatch({
                type:GET_ROOM,
                payload:room
            })
            console.log(room,"one room")
        } catch (error) {
            console.log(error)
            dispatch({type:ERROR_ROOMS})
        }
    }
}