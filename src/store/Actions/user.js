import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_LOADING,
  REGISTER_ERROR,
  USER_ERROR,
  USER_LOADING,
  FOLLOW_USER,
  UNFOLLOW_USER,
  USER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  GET_SINGLE_USER,
  GET_SINGLE_USER_ERROR,
  GET_USERS,
  GET_USERS_ERROR,
  UPDATED_USER_SUCCESS,
  UPDATED_USER_ERROR,
  UPDATED_USER_LOADING,
  GET_FAVOURITE
} from "../types";
import {
  login,
  userBySearch,
  me,
  logout,
  updateProfile,
  addPicture,
  follow,
  unfollow,
  userById,
  register,
  users
} from "../../utils/users";
export const changeProfile = (data) => {
  return async (dispatch) => {
    dispatch({
      type:UPDATED_USER_LOADING
    })
    console.log(data,"tp be updated")
    try {
      await updateProfile(data)
      dispatch({
        type:UPDATED_USER_SUCCESS
      })
      dispatch(getMe())
    } catch (error) {
      console.log(error)
      dispatch({
        type:UPDATED_USER_ERROR
      })
    }
  }
}
export const changeProfilePicture = (avatar) => {
  return async (dispatch) => {
    dispatch({
      type:UPDATED_USER_LOADING
    })
    try {
      console.log(avatar,"the avatar")
      await addPicture(avatar)
      dispatch({
        type:UPDATED_USER_SUCCESS
      })
      dispatch(getMe())
    } catch (error) {
      console.log(error)
      dispatch({
        type:UPDATED_USER_ERROR
      })
    }
  }
}
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const allUsers = await users();
      dispatch({
        type: GET_USERS,
        payload: allUsers,
      });
    } catch (error) {
      dispatch({
        type: GET_USERS_ERROR,
        payload:error
      });
    }
  };
};
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
export const followUser = (id) => {
  return async (dispatch) => {
    try {
      const req = await follow(id)
      console.log(req,"my array of following")
      dispatch({
        type:FOLLOW_USER,
        payload:req
      })
      dispatch(getMe())
      dispatch(getUserById(id))
    } catch (error) {
      console.log(error)
    }
  }
}
export const unfollowUser = (id) => {
  return async (dispatch) => {
    try {
      const req = await unfollow(id)
      console.log(req,"getting updated current user")
      dispatch({
        type:UNFOLLOW_USER,
        payload:req.following
      })
      dispatch(getMe())
      dispatch(getUserById(id))
    } catch (error) {
      console.log(error)
    }
  }
}
export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const user = await userById(id);
      console.log(user,"fetched user")
      dispatch({
        type: GET_SINGLE_USER,
        payload: user,  
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_USER_ERROR,
      });
    }
  };
};
export const getUserBySearch = (q) => {
  return async (dispatch) => {
    try {
      const user = await userBySearch(q);
      console.log(user,"fetched user")
      dispatch({
        type: GET_SINGLE_USER,
        payload: user,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_USER_ERROR,
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
