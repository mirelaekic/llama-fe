import axios from "axios";

const LLAMA_API = process.env.REACT_APP_LLAMA_API;

// GET ALL POSTS
export const posts = async () => {
  try {
    const posts = await axios.get(`${LLAMA_API}posts`, {
      withCredentials: true,
    });
    return posts.data.reverse();
  } catch (error) {
    console.log(error);
    return null;
  }
};
//GET MY POSTS
export const myPosts = async () => {
  try {
    const posts = await axios.get(`${LLAMA_API}posts/me`, {
      withCredentials: true,
    });
    return posts.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
//POST A POST
export const publishPost = async (pic, description) => {
  try {
    let formData = new FormData();
    formData.append("image", pic);
    formData.append("description", description)
        const posts = await fetch(`${LLAMA_API}posts/me`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
          body:formData
        });
        return posts.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const postPicture = async(pic) => {}
//GET POST BY ID
export const postById = async (id) => {
  try {
    const post = await axios.get(`${LLAMA_API}posts/${id}`, {
      withCredentials: true,
    });
    return post.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
//EDIT MY POST
export const editPost = async (id, update) => {
  try {
    const posts = await axios.put(`${LLAMA_API}posts/${id}`, update, {
      withCredentials: true,
    });
    return posts.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
//DELETE MY POST
export const deletePost = async (id) => {
  try {
    const posts = await axios.delete(`${LLAMA_API}posts/me/${id}`, {
      withCredentials: true,
    });
    return posts.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
