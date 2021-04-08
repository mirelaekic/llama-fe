import React, { useEffect, useState } from "react";
import "../styles.css";
import { ListGroup } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getSinglePlaceDetails } from "../../store/Actions/explore";
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
  const favourites = useSelector((state) => state.explore.favourite);
  const details = useSelector((state) => state.explore.singleResult.result);

  const [lastElement] = useState(favourites[favourites.length - 1]);
  const classes = useStyles();
  const filteredAry = allUsers.filter((e) => {
    return e._id !== user._id;
  });
  const removeFollowing = filteredAry.filter((e) => {
    return user.following.filter((u) => {
      return u.user !== e._id;
    });
  });
  const dispatch = useDispatch();
  console.log(lastElement, "the last element");
  useEffect(() => {
    dispatch(
      getSinglePlaceDetails(
        favourites && lastElement ? lastElement.placeId : null
      )
    );
  }, [lastElement]);
  console.log(details, "the details");
  return allUsers && user ? (
    <div>
      <>
        {favourites ? (
          <ListGroup className="trends-list">
            <h2 className="suggestion-header mb-3">
              Hi {user.name}, your latest saved:
            </h2>
            <ListGroup.Item>
              <div className="profile-name">
                <img className="user-recomm-pic" src={lastElement ? lastElement.photoRef : null} />
              </div>
              <button className="followButton">Follow</button>
            </ListGroup.Item>
          </ListGroup>
        ) : null}
      </>
      <>
        <ListGroup className="homeSuggestionsList mb-5">
          <h2 className="suggestion-header mb-3">Suggestions For You</h2>
          {removeFollowing.map((user, i) => (
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
              <button className="followButton">Follow</button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    </div>
  ) : null;
}
