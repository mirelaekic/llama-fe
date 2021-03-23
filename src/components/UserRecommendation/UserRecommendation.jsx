import React, { useState } from "react";
import "../styles.css";
import { ListGroup } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function UserRecommendation() {
  const user = useSelector((state) => state.user.user);
  const allUsers = useSelector((state) => state.user.allUsers);
  
  const classes = useStyles();
  return allUsers && user ? (
    <div>
      <ListGroup className="homeSuggestionsList mb-5">
        <h2 className="suggestion-header mb-3">Suggestions For You</h2>
        {allUsers.slice(1, 5).map((user, i) => (
          <ListGroup.Item key={i}>
            <div className="profile-name">
              <Avatar src={user.imgUrl} className={classes.small} />
              <div className="suggInfo">
                <Link className="linkUser" to={"profile/" + user._id}>
                  {user.name} {user.surname}
                </Link>
                <br />
                {/* <p className="text-muted">followed by</p> */}
              </div>
            </div>
            <button className="followButton">Follow
            </button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    {/* <  <ListGroup className="trends-list">
        <h2 className="suggestion-header mb-3">Trends For You</h2>
        {trends.slice(1, 5).map((user, i) => (
          <ListGroup.Item key={i}>
            <div className="profile-name">
              <Avatar src={user.imgUrl} className={classes.small} />
              <div className="suggInfo">
                <Link className="linkUser" to={"profile/" + user._id}>
                  {user.name} {user.surname}
                </Link>
                <br />
                p className="text-muted">followed by</p> 
              </div>
            </div>
            <button className="followButton">Follow
            </button>
          </ListGroup.Item>
        ))}
      </ListGroup>*/}
    </div>
  ) : null;
}