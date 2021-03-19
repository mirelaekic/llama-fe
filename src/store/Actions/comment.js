import { COMMENT_ERROR,COMMENTS_BY_ID, COMMENT_SUCCESS, ERROR_ALL_COMMENTS, GET_ALL_COMMENTS } from "../types"
import { comments,postComment,commentsById } from "../../utils/comments"

export const getAllComments = () => {
    return async (dispatch) => {
      try {
        const allComments = await comments();
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

  export const getCommentById = (id) => {
    return async (dispatch) => {
      try {
        const commentsID = await commentsById(id);
        dispatch({
          type: COMMENTS_BY_ID,
          payload: commentsID,
        });
        console.log(commentsID,"Length of comments")
      } catch (error) {
        console.log(error,"comment error")
        dispatch({
          type: ERROR_ALL_COMMENTS,
          payload:error
        });
      }
    };
  }

  export const addComment = (postId,comment) => {
      return async (dispatch) => {
          try {
            if(comment === ""){
              dispatch({
                type:COMMENT_ERROR,
            })
            } else {
              await postComment(postId,comment)
              dispatch({
                  type:COMMENT_SUCCESS,
                  payload:comment
              })
              dispatch(getAllComments())
            }
          } catch (error) {
              dispatch({
                  type:COMMENT_ERROR
              })
          }
      }
  }