
import {
    LOGIN_ERROR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_LOADING,
    REGISTER_ERROR,
    USER_ERROR,
    USER_LOADING,
    USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR
  } from "../types";
import {login,me,logout,updateProfile,addPicture, register} from "../../utils/users"

export const logoutAction = () => {
    return async dispatch => {
        try {
            const loggedOut = await logout()
            localStorage.removeItem("accessToken")
            if (loggedOut) {
                dispatch({
                    type:LOGOUT_SUCCESS
                })
            } else {
                dispatch({type:LOGOUT_ERROR})
            }
        } catch (error) {
            dispatch({type:LOGOUT_ERROR})
        }
    }
}

export const loginAction = (credentials) => {
    return async dispatch => {
    try {
        console.log("LOGGIN AT LOGIN ACTION")
        //dispatch({type: LOGIN_LOADING})
        const logged = await login(credentials)
        console.log(logged,"LOGGIN AT LOGIN ACTION")
        if (logged) {
            dispatch({
                type:LOGIN_SUCCESS,
                payload:logged
            })
            localStorage.setItem("accessToken",logged.accessToken)
            const user = await me()
            console.log(user,"PROBLEM IS GETTING THE ME ROUTE")
            dispatch({
                type:USER_SUCCESS,
                payload:user
        })
        
} else {
    dispatch({
        type:LOGIN_ERROR
    }) 
}
 } catch (error) {
        dispatch({
            type:LOGIN_ERROR
        })
    }
}
}
export const registerAction = (credentials) => async dispatch => {
    try {
      dispatch({type: REGISTER_LOADING})
    const register = await register(credentials)
    if (register) {
        dispatch({type: REGISTER_SUCCESS, payload:register}) 
    }  
    } catch (error) {
      dispatch({
          type: REGISTER_ERROR
      })  
    }
    
}