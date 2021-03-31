import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlaces,
  getPlacesPhoto,
  getSinglePlaceDetails,
} from "../../store/Actions/explore";
import { GET_PLACES_ERROR } from "../../store/types";
import { placePhoto } from "../../utils/explore";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import "./ExploreCard.css";
import { CircularProgress } from "@material-ui/core";
const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
      display: "block",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function EcploreCard({ lat, long }) {
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (lat && long === undefined) {
      dispatch({ type: GET_PLACES_ERROR });
    } else {
      dispatch(getPlaces(lat, long));
    }
  }, []);
  const places = useSelector((state) => state.explore.places.results);
  const photoUrl = useSelector((state) => state.explore.photo);
  const loading = useSelector((state) => state.explore.loading);

  const getDetails = (photoRef,placeId) => {
    dispatch(getPlacesPhoto(photoRef));
    dispatch(getSinglePlaceDetails(placeId))
  };
  return (
    <div>
      {places
        ? places.map((p, i) => (
            <Accordion
              key={i}
              square
              expanded={expanded === p.place_id}
              onClick={() =>
                getDetails(p.photos[0] ? p.photos[0].photo_reference : null,p.place_id ? p.place_id : null)
              }
              onChange={handleChange(p.place_id)}
            >
              <AccordionSummary className="title-acc" id={p.place_id}>
                <Typography>{p.name}</Typography>
                <small className="text-muted">{p.vicinity}</small>
              </AccordionSummary>
                {loading ? (
                    <div class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                    
                    <AccordionDetails>
                  <img className="place-photo" src={photoUrl.url} />
                <Typography>
                  <ul>
                      <li><h3>{p.name}</h3></li>
                      <li>currently open</li>
                      <li>price level</li>
                      <li>ratings</li>
                      <li>invite frind </li>
                  </ul>
                </Typography>
              </AccordionDetails>
                )}
            </Accordion>
          ))
        : null}
    </div>
  );
}
