import {
  COMMENT_ERROR,
  COMMENT_LOADING,
  COMMENT_SUCCESS,
  GET_ALL_COMMENTS,
  ERROR_ALL_COMMENTS,
} from "../types";

const initialState = {
  allComments: [],
  loading: false,
  error: "",
  postComment: {},
  deleteComment: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case COMMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
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
