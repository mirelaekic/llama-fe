import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles.css";
import background from "../../icon/travelers.png";
import ExploreList from "../../components/ExploreList/ExploreList";
import { getMe } from "../../store/Actions/user";
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: 'black',
    },
  }));
export default function Explore() {
  const dispatch = useDispatch();

  const classes = useStyles();
   useEffect(() => {
       dispatch(getMe());
    }, []);
  const user = useSelector((state) => state.user.user);
  return user ? (
    <div className="explore-page">
      <img className="explore-background img-fluid" src={background} />
      <h1 className="explore-title">
        Find places around you and invite your friends to meet there!
      </h1>
      <ExploreList />
    </div>
  ) : (
    <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
  );
}
