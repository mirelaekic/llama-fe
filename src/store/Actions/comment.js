import { COMMENT_ERROR, COMMENT_SUCCESS, ERROR_ALL_COMMENTS, GET_ALL_COMMENTS } from "../types"
import { comments,postComment } from "../../utils/comments"

export const getAllComments = (postId) => {
    return async (dispatch) => {
      try {
        const allComments = await comments(postId);
        dispatch({
          type: GET_ALL_COMMENTS,
          payload: allComments,
        });
      } catch (error) {
        console.log(error,"comment error")
        dispatch({
          type: ERROR_ALL_COMMENTS,
          payload:error
        });
      }
    };
  };

  export const addComment = (postId,comment) => {
      return async (dispatch) => {
          try {
              console.log(postId,"TO POST COMM")
              const upload = await postComment(postId,comment)
              dispatch({
                  type:COMMENT_SUCCESS,
                  payload:upload
              })
          } catch (error) {
              dispatch({
                  type:COMMENT_ERROR,
                  payload:error
              })
          }
      }
  }