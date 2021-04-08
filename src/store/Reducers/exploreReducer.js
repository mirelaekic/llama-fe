import {
  GET_PLACE_DETAILS,
  DETAILS_LOADING,
  PHOTO_LOADING,
  GET_PLACE_PHOTO,
  GET_PLACES,
  GET_PLACES_ERROR,
  GET_PLACES_LOADING,
  GET_FAVOURITE,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
} from "../types";

const initialState = {
  places: [],
  loading: false,
  error: String,
  allPhotos: [],
  photo: {},
  singleResult: {},
  favourite:[],
  removeFav:{},
  addFav:{}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PLACES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_PLACE_DETAILS:
      return {
        ...state,
        loading: false,
        singleResult: action.payload,
      };
    case GET_PLACE_PHOTO:
      return {
        ...state,
        loading: false,
        photo: action.payload,
      };
    case PHOTO_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DETAILS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PLACES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PLACES:
      return {
        ...state,
        loading: false,
        places: action.payload,
      };
    case GET_FAVOURITE:
      return {
        ...state,
        favourite: action.payload,
      };
    case ADD_TO_FAVOURITE:
      return {
        ...state,
        addFav: action.payload,
      };
    case REMOVE_FROM_FAVOURITE:
      return {
        ...state,
        removeFav: action.payload,
      };
    default:
      return state;
  }
}
