import axios from "axios";
import backend from "../token";
const LLAMA_API = process.env.REACT_APP_LLAMA_API;
// LIKE/DISLIKE POST
export const likeForPost = async (id) => {
  try {
    const like = await backend.post(`${LLAMA_API}like/${id}`, {
      withCredentials: true,
    });
    //console.log(like, "LIKE DATA")
    return like.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// GET LIKES FOR THE POST
export const getLikesForPost = async (id) => {
  try {
    const likes = await backend.get(`${LLAMA_API}like/${id}`, {
      withCredentials: true,
    });
    console.log(likes, "GETTING LIKES DATA");
    return likes.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
//GET ALL LIKES
export const getAllLikes = async () => {
  try {
    const likes = await backend.get(`${LLAMA_API}like/`, {
      withCredentials: true,
    });
    //console.log(likes, "GETTING LIKES DATA")
    return likes.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

