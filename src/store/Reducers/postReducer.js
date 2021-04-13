import {
  POST_ERROR,
  POST_LOADING,
  POSTS_SUCCESS,
  UPLOAD_POST,
  MY_POSTS,
  SINGLE_POST,
  DELETE_POST
} from "../types";

const initialState = {
  myPosts: [],
  allPosts: [],
  loading: false,
  error: "",
  uploadPost: {},
  singlePost: {},
  delete:""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_POST:
      return {
        ...state,
        delete:"Post deleted!"
      }
    case POST_ERROR:
      return {
        ...state,
        error: "We aplogize, something went wrong",
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case POSTS_SUCCESS:
      return {
        ...state,
        allPosts: action.payload,
      };
    case MY_POSTS:
      return {
        ...state,
        myPosts: action.payload,
      };
    case UPLOAD_POST:
      return {
        ...state,
        uploadPost: action.payload,
      };
    case SINGLE_POST:
      return {
        ...state,
        singlePost: action.payload,
      };
    default:
      return state;
  }
}
