import { combineReducers } from "redux";
import userReducer from "./userReducer"
import postReducer from "./postReducer"

const RootReducer = combineReducers({
    user: userReducer,
    post:postReducer,
})
export default RootReducer