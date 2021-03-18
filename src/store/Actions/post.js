import {POST_LOADING,POSTS_SUCCESS,POST_ERROR,MY_POSTS,UPLOAD_POST,SINGLE_POST} from "../types"
import {postById,posts,myPosts,publishPost,editPost,deletePost} from "../../utils/posts"

export const getAllPosts = () => {
    return async (dispatch) => {
      try {
        const allPosts = await posts();
        dispatch({
          type: POSTS_SUCCESS,
          payload: allPosts,
        });
      } catch (error) {
        console.log(error,"posts error")
        dispatch({
          type: POST_ERROR,
        });
      }
    };
  };

  export const getPostById = (id) => {
    return async (dispatch) => {
      try {
        const post = await postById(id);
        dispatch({
          type: SINGLE_POST,
          payload: post,
        });
      } catch (error) {
        dispatch({
          type: POST_ERROR,
        });
      }
    };
  };

  export const uploadPost = (postImg,description) => {
    return async (dispatch) => {
      try {
          console.log(postImg,"DATA TO POST")
        const post = await publishPost(postImg,description);
        dispatch({
          type: UPLOAD_POST,
          payload: post,
        });
        dispatch(getAllPosts())
      } catch (error) {
        dispatch({
          type: POST_ERROR,
        });
      }
    };
  };
