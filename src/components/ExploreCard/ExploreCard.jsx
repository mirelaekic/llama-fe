import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getPlaces, getPlacesPhoto } from "../../store/Actions/explore";
import { GET_PLACES_ERROR } from "../../store/types";
import { placePhoto } from "../../utils/explore";

export default function ExploreCard({ lat, long }) {
    const [pic, setPic] = useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    if (lat && long === undefined) {
      dispatch({ type: GET_PLACES_ERROR });
    } else {
        dispatch(getPlaces(lat, long));
    }
   // dispatch(getPlacesPhoto(pic))
  }, []);
  const photos = async (ref) => {
    try {
        console.log(ref,"if the ref is in the func")
        const res = await placePhoto(ref)
        console.log(res,"the response")
        setPic(res)
    } catch (error) {
        console.log(error)
    }
  }
  
  const places = useSelector((state) => state.explore.places.results);
  console.log(places,"all the plces")
  return places
    ? places.map((p, i) => (
        
         <Card

           // photoRef={setPic(p.photos[0] ? p.photos[0].photo_reference : null)}
           key={i}
           photo={pic}
           placeID={p.place_id ? p.place_id : null}
         />  
      ))
    : null;
}
