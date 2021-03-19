import { combineReducers } from "redux";
import userReducer from "./userReducer"
import postReducer from "./postReducer"
import commentReducer from "./commentReducer"
import likeReducer from "./likeReducer"

const RootReducer = combineReducers({
    user: userReducer,
    comment:commentReducer,
    post:postReducer,
    like:likeReducer
})
export default RootReducer