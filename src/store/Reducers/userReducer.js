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
  LOGOUT_ERROR,
  LOGOUT_SUCCESS
} from "../types";

const initialState = {
  loading: false,
  user: null,
  authorized: false,
  error: "",
  token:{}
};
export default function (state=initialState,action) {
  switch (action.type) {
    case LOGOUT_ERROR:
      return {
        ...state,
        authorized:false,
        error:"We apologize, please try again in few minutes"
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authorized:false,
        user:null,
        token:{}
      }
    case LOGIN_ERROR:
      return {
        ...state,
        authorized: false,
        error: "Please enter correct email or password",
      };
    case REGISTER_ERROR:
      return {
        ...state,
        authorized: false,
        error: "Something went wrong, please try again later!",
      };
    case USER_ERROR:
        return {
            ...state,
            authorized: false,
            error: "Something went wrong, please try again later!",
        }
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADING:
        return {
            ...state,
            loading: true
        }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token:action.payload,
        authorized: true,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        authorized: true,
        user: action.payload,
      };
    case USER_SUCCESS:
        return {
            ...state,
            authorized: true,
            user: action.payload
        }
    default:
      return state;
  }
};