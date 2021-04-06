import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
//import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import {
  getPlaces,
  getPlacesPhoto,
  getSinglePlaceDetails,
} from "../../store/Actions/explore";
import { GET_PLACES_ERROR } from "../../store/types";
import { withStyles } from "@material-ui/core/styles";
import "./ExploreCard.css";
import EuroIcon from "@material-ui/icons/Euro";
import openIcon from "../../icon/openIcon.jpg";
import closedIcon from "../../icon/closedIcon.jpg";
import { Button } from "@material-ui/core";
import ExploreModal from "../ExploreModal/ExploreModal";
import { Accordion,Card } from "react-bootstrap";

export default function EcploreCard({ lat, long }) {
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const dispatch = useDispatch();
//   useEffect(() => {
//     if (lat && long === undefined) {
//       dispatch({ type: GET_PLACES_ERROR });
//     } else {
//       dispatch(getPlaces(lat, long));
//     }
//   }, []);
  const places = useSelector((state) => state.explore.places.results);
  const photoUrl = useSelector((state) => state.explore.photo);
  const loading = useSelector((state) => state.explore.loading);
  const detail = useSelector((state) => state.explore.singleResult.result);

  const getDetails = (photoRef, placeId) => {
    dispatch(getPlacesPhoto(photoRef));
    dispatch(getSinglePlaceDetails(placeId));
  };
  return places ? (
    <div>
        <Accordion>
      {places
        ? places.map((p, i) => (
            <>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle onClick={() =>
                getDetails(p.photos[0] ? p.photos[0].photo_reference : null,p.place_id ? p.place_id : null)
              } as={Button} className="button-accordian" variant="link" eventKey={p.place_id}>
                     <img className="icon-accordian" src={p.icon} /> {p.name}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={p.place_id}>
                    <Card.Body>{loading ? (
                    <div class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                    <div>
                  <img className="place-photo" src={photoUrl.url} />
                <div>
                 {detail ? <ul className="place-detail">
                      <li><h3>{p.name}</h3></li>
                      <li className="mb-1">{detail.formatted_address}</li>
                      <li><Rating name="half-rating-read" defaultValue={detail.rating} precision={0.1} readOnly /></li>
                      {detail.price_level ? 
                      <li><Rating className="price-rating" name="half-rating-read" icon={<EuroIcon fontSize="inherit" />} defaultValue={detail.price_level} precision={0.1} readOnly /></li>
                      : ""
                    }
                    {detail.opening_hours ?  <li><img className="open-icon" src={detail.opening_hours.open_now ? openIcon : closedIcon} /></li> : null }
                    <li className="mt-3 action-expl-btn"> <ExploreModal /> <Button className=" ml-2 fav-btn">add to favourite</Button></li>
                  </ul> : null}
                </div>
              </div>
                )}</Card.Body>
                  </Accordion.Collapse>
                </Card>
            </>
          ))
          : null}
      {/* <div className={expanded ? "showModal" : "hideModal"}>
        <ExploreModal />
      </div> */}
          </Accordion>
    </div>
  ) : null;
}
