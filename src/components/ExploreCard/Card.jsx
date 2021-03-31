import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlacesPhoto, getSinglePlaceDetails } from "../../store/Actions/explore";

export default function Card({ place,placeID, }) {
  const dispatch = useDispatch();
  const photoUrl = useSelector((state) => state.explore.photo);
  const details = useSelector((state) => state.explore.singleResult.result);
  const ifPhotoRef = place.photos[0] ? place.photos[0].photo_reference : null
  const singlePhoto = photoUrl.photo_ref ? photoUrl.photo_ref : null
  const picArray = useSelector((state) => state.explore.allPhotos);
//   useEffect(()=>{
//       if(place){
//          // dispatch(getSinglePlaceDetails(place.place_id ? place.place_id : null))
//           dispatch(getPlacesPhoto(place.photos[0] ? place.photos[0].photo_reference : null))
//       }
//   },[])
//console.log(place, "the single place")
// const getInfo = () => {
//     console.log(placeID,photoRef,"the params")
//     dispatch(getSinglePlaceDetails(placeID))
//     dispatch(getPlacesPhoto(photoRef))
//   }

const getPic = (photoRef) => {
    if(photoRef){
        dispatch(getPlacesPhoto(photoRef))
        return (<img src={photoUrl.url} />)
    } else {
        return null
    }

}
 //console.log(details,"the single place details ----------")
  return (
    <div className="card mb-3" key={place.place_id}>
      <div className="row no-gutters">
        <div className="col-md-4">
            
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{place.name}</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-muted">{place.vicinity}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
