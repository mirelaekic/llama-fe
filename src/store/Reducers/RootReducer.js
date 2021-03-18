import { combineReducers } from "redux";
import userReducer from "./userReducer"
import postReducer from "./postReducer"
import commentReducer from "./commentReducer"

const RootReducer = combineReducers({
    user: userReducer,
    comment:commentReducer,
    post:postReducer,
})
export default RootReducer