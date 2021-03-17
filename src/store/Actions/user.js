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
  LOGOUT_ERROR,
} from "../types";
import {
  login,
  me,
  logout,
  updateProfile,
  addPicture,
  register,
} from "../../utils/users";

export const getMe = () => {
  return async (dispatch) => {
    try {
      const user = await me();
      dispatch({
        type: USER_SUCCESS,
        payload: user,
      });
    } catch (error) {
      dispatch({
        type: USER_ERROR,
      });
    }
  };
};

export const logoutAction = () => {
  return async (dispatch) => {
    try {
      const loggedOut = await logout();
      if (loggedOut) {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
        window.location.replace("/login");
      } else {
        dispatch({ type: LOGOUT_ERROR });
      }
    } catch (error) {
      dispatch({ type: LOGOUT_ERROR });
    }
  };
};

export const loginAction = (credentials) => {
  return async (dispatch) => {
    try {
      console.log("LOGGIN AT LOGIN ACTION");
      dispatch({ type: LOGIN_LOADING });
      const logged = await login(credentials);
      console.log(logged,"LOGGED")
      if (logged) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: logged,
        });
        const user = await me();
        dispatch({
          type: USER_SUCCESS,
          payload: user,
        });
        window.location.replace("/");
      } else {
        dispatch({
          type: LOGIN_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
};
export const registerAction = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_LOADING });
    const registerUser = await register(credentials);
    console.log(registerUser,"USER")
    if (registerUser === null) {
      dispatch({
        type: REGISTER_ERROR,
      });
    } else {
      dispatch({ type: REGISTER_SUCCESS, payload: registerUser });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_ERROR,
    });
  }
};
