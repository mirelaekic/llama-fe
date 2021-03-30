import { combineReducers } from "redux";
import userReducer from "./userReducer"
import postReducer from "./postReducer"
import commentReducer from "./commentReducer"
import likeReducer from "./likeReducer"
import roomReducer from "./roomsReducer"
import exploreReducer from "./exploreReducer"
const RootReducer = combineReducers({
    user: userReducer,
    comment:commentReducer,
    post:postReducer,
    like:likeReducer,
    rooms:roomReducer,
    explore:exploreReducer
})
export default RootReducer