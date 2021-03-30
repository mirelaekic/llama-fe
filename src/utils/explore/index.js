import axios from "axios";
import backend from "../token";

const LLAMA_API = process.env.REACT_APP_LLAMA_API;
// GET ALL PLACES
export const places = async (lat,long) => {
  try {
    const place = await backend.post(`${LLAMA_API}users/places`,{lat,long}, {
      withCredentials: true,
    });
    console.log(place.data,"the places from fetch");
    return place.data
  } catch (error) {
    console.log(error);
    return null;
  }
};