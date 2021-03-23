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
  LOGOUT_SUCCESS,
  GET_SINGLE_USER_ERROR,
  GET_SINGLE_USER,
  GET_USERS,
  GET_USERS_ERROR,
  FOLLOW_USER,
  UNFOLLOW_USER
} from "../types";

const initialState = {
  loading: false,
  user: null,
  authorized: false,
  error: "",
  token:{},
  getUserById:{},
  allUsers:[],
  followUser:{},
  followingArray:[],
  successMsg:""
};
export default function (state=initialState,action) {
  switch (action.type) {
    case FOLLOW_USER:
      return {
        ...state,
        loading:false,
        followUser:action.payload
      }
      case UNFOLLOW_USER:
        return {
          ...state,
          loading:false,
          followingArray:action.payload,
          successMsg:"user has been unfollowed"
        }
    case GET_USERS:
      return{
        ...state,
        loading:false,
        allUsers:action.payload
      }
    case GET_USERS_ERROR:
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    case LOGOUT_ERROR:
      return {
        ...state,
        authorized:false,
        loading:false,
        error:"We apologize, please try again in few minutes"
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authorized:false,
        loading:false,
        user:null,
        token:{}
      }
      case GET_SINGLE_USER_ERROR:
        return {
          ...state,
          getUserById:{},
          error:"User not found"
        }
    case LOGIN_ERROR:
      return {
        ...state,
        authorized: false,
        loading:false,
        error: "Please enter correct email or password",
      };
    case REGISTER_ERROR:
      return {
        ...state,
        authorized: false,
        error: "Please fill out all fields!",
        loading:false,
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
    case GET_SINGLE_USER:
      return{
        ...state,
        getUserById:action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token:action.payload,
        authorized: true,
        user: action.payload,
        loading:false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        authorized: true,
        user: action.payload,
        loading:false,
        notification:"Registration has been successful, please check your e-mail to confirm your account"
      };
    case USER_SUCCESS:
        return {
          loading:false,
            ...state,
            authorized: true,
            user: action.payload
        }
    default:
      return state;
  }
};