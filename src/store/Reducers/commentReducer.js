import {
  COMMENT_ERROR,
  COMMENT_LOADING,
  COMMENT_SUCCESS,
  GET_ALL_COMMENTS,
  ERROR_ALL_COMMENTS,
  COMMENTS_BY_ID
} from "../types";


const initialState = {
  allComments: [],
  commentsById:null,
  loading: false,
  error: "",
  postComment: "",
  deleteComment: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMMENT_ERROR:
      return {
        ...state,
        error: "The comment should have at least 1 char"
      };
    case COMMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case COMMENTS_BY_ID:
      return {
        ...state,
        commentsById:action.payload
      }
    case COMMENT_SUCCESS:
      return {
        ...state,
        postComment: action.payload,
      };
    case GET_ALL_COMMENTS:
      return {
        ...state,
        allComments: action.payload,
      };
    case ERROR_ALL_COMMENTS:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
