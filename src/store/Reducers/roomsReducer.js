import {
    GET_ROOMS,
    ERROR_ROOMS,
    GET_ROOM
} from "../types"

const initialState = {
    allRooms: [],
    error:"",
    singleRoom:{}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ROOMS:
            return {
                ...state,
                allRooms:action.payload
            }
        case ERROR_ROOMS:
            return {
                ...state,
                error:"something went wrong"
            }
        case GET_ROOM:
            return {
                ...state,
                singleRoom:action.payload
            }
        default:
            return state
    }
}
