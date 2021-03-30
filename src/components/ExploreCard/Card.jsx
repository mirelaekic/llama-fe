import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlacesPhoto, getSinglePlaceDetails } from "../../store/Actions/explore";

export default function Card({ key,placeID, photoRef }) {
  const dispatch = useDispatch();
useEffect(()=>{
    dispatch(getSinglePlaceDetails(placeID))
},[])
  const photoUrl = useSelector((state) => state.explore.photo);
  //console.log(photoUrl,"the photo URL IN CARD___")
  console.log(placeID,"the place ID ----------")
  return (
    <div className="card mb-3" key={key}>
      <div className="row no-gutters">
        <div className="col-md-4">
            {/* {photoUrl ? <img src={photoUrl} /> : ""} */}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
