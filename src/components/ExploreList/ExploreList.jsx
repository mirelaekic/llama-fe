import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import "./ExploreList.css";
import ExploreCard from "../ExploreCard/ExploreCard";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function ExploreList() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates);
      return true;
    } else {
      return false;
    }
  }

  function getCoordinates(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  }
  const toggleDrawer = async () => {
    await getLocation();
    setState({ bottom: true });
  };
  const closeDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={() => toggleDrawer()} className="explore-button">
            EXPLORE PLACES
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={closeDrawer(anchor, false)}
          >
             {lat && long === undefined ? null : (
              <ExploreCard lat={lat} long={long} />
            )} 
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
