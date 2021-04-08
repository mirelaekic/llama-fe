import axios from "axios";
import backend from "../token";

const LLAMA_API = process.env.REACT_APP_LLAMA_API;

// GET ALL PLACES
export const places = async (lat,long, type) => {
  try {
    console.log(type, "if the type is defined")
    const place = await axios.post(`${LLAMA_API}users/places`,{lat,long, type}, {
      withCredentials: true,
    });
    console.log(place.data,"the places from fetch");
    return place.data
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const placePhoto = async (refPhoto) => {
    try {
      const photo = await axios.get(`${LLAMA_API}users/place/photo/${refPhoto}`, {
        withCredentials: true,
      });
      return photo.data
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  export const placeDetails = async (placeId) => {
    try {
      const res = await axios.get(`${LLAMA_API}users/place/${placeId}`, {
        withCredentials: true,
      });
      return res.data
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //GET ALL FAVOURITES
export const getFav = async () => {
  try {
      const fav = await axios.get(`${LLAMA_API}like/favorite`, {
          withCredentials:true
      })  
      return fav.data
  } catch (error) {
      console.log(error)
      return null
  }
}
  // POST PLACE ID TO FAVOURITE ARRAY
export const addToFav = async (cityId, photoRef) => {
  const photo = JSON.stringify({ photoUrl: photoRef });
  let config =   {
    method:"post",
    url: `${LLAMA_API}like/favourite/${cityId}`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials:true,
    data: photo,
  };
  try {
    const fav = await axios(config)
    return fav.data
  } catch (error) {
    
  }
  axios(config)
    .then(function (response) {
      return JSON.stringify(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
};
// REMOVE PLACE ID FROM FAVOURITE ARRAY
export const removeFromFav = async (cityId) => {
  try {
    const fav = await backend.post(`${LLAMA_API}like/removeFav/${cityId}`, {
      withCredentials: true,
    });
    return fav.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
