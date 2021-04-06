import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import {
  getPlaces,
  getPlacesPhoto,
  getSinglePlaceDetails,
} from "../../store/Actions/explore";
import "./ExploreCard.css";
import EuroIcon from "@material-ui/icons/Euro";
import openIcon from "../../icon/openIcon.jpg";
import closedIcon from "../../icon/closedIcon.jpg";
import { Button } from "@material-ui/core";
import ExploreModal from "../ExploreModal/ExploreModal";
import { Accordion, Card } from "react-bootstrap";
import PhoneIcon from "@material-ui/icons/Phone";
import LanguageIcon from "@material-ui/icons/Language";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "50rem",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function ExploreL() {
  const dispatch = useDispatch();

  const places = useSelector((state) => state.explore.places.results);
  const photoUrl = useSelector((state) => state.explore.photo);
  const loading = useSelector((state) => state.explore.loading);
  const detail = useSelector((state) => state.explore.singleResult.result);
  console.log(photoUrl, "the photo");
  const classes = useStyles();
  const [value, setValue] = React.useState(detail ? detail.place_id : null);

  const getDetails = (photoRef, placeId) => {
    dispatch(getPlacesPhoto(photoRef));
    dispatch(getSinglePlaceDetails(placeId));
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {places
          ? places.map((p, i) => (
              <Tab
                onClick={() =>
                  getDetails(
                    p.photos ? p.photos[0].photo_reference : null,
                    p.place_id ? p.place_id : null
                  )
                }
                label={<><img className="icon" src={p.icon} /> <p>{p.name}</p></>}
                {...a11yProps(p.place_id)}
              />
            ))
          : null}
      </Tabs>
      {detail ? (
        <TabPanel value={detail.place_id} index={detail.place_id}>
          <Card.Body>
            {loading ? (
              <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <div>
                {loading ? (
                  <div class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <img
                    className="place-photo"
                    src={photoUrl === null ? "" : photoUrl.url}
                  />
                )}
                <div>
                  {detail ? (
                    <ul className="place-detail">
                      <li>
                        <h3>{detail.name}</h3>
                      </li>
                      <li className="mb-1">{detail.formatted_address}</li>
                      {detail.website ? (
                        <li>
                          <LanguageIcon />{" "}
                          <a target="_blank" href={detail.website}>
                            {" "}
                            {detail.name} website{" "}
                          </a>
                        </li>
                      ) : null}
                      {detail.formatted_phone_number ? (
                        <li>
                          <PhoneIcon /> {detail.formatted_phone_number}
                        </li>
                      ) : null}
                      <li className="mt-2">
                        <Rating
                          name="half-rating-read"
                          defaultValue={detail.rating}
                          precision={0.1}
                          readOnly
                        />
                      </li>
                      {detail.price_level ? (
                        <li>
                          <Rating
                            className="price-rating"
                            name="half-rating-read"
                            icon={<EuroIcon fontSize="inherit" />}
                            defaultValue={detail.price_level}
                            precision={0.1}
                            readOnly
                          />
                        </li>
                      ) : (
                        ""
                      )}
                      {detail.opening_hours ? (
                        <li>
                          <img
                            className="open-icon"
                            src={
                              detail.opening_hours.open_now
                                ? openIcon
                                : closedIcon
                            }
                          />
                        </li>
                      ) : null}
                      <li className="mt-3 action-expl-btn">
                        {" "}
                        <ExploreModal />{" "}
                        <Button className=" ml-2 fav-btn">
                          add to favourite
                        </Button>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
            )}
          </Card.Body>
        </TabPanel>
      ) : null}
    </div>
  );
}
