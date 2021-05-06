import React from "react";
import "../styles.css";
import { Carousel, ListGroup } from "react-bootstrap";
// import { makeStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   small: {
//     width: theme.spacing(4),
//     height: theme.spacing(4),
//   },
//   large: {
//     width: theme.spacing(7),
//     height: theme.spacing(7),
//   },
// }));

export default function UserRecommendation() {
  const user = useSelector((state) => state.user.user);
  const allUsers = useSelector((state) => state.user.allUsers);
  const favourites = useSelector((state) => state.explore.favourite);
  // const classes = useStyles()
  // const filteredAry = allUsers.filter((e) => {
  //   return e._id !== user._id;
  // });
  // const removeFollowing = filteredAry.filter((e) => {
  //   return user.following.filter((u) => {
  //     return u.user !== e._id;
  //   });
  // });

  return allUsers && user && favourites ? (
    <div>
      <>
        <ListGroup className="trends-list">
          <h2 className="suggestion-header mb-3">
            Hi {user.name},<br/> your latest saved:
          </h2>
          <ListGroup.Item className="pic-list-item">
            <Carousel>
              {favourites.map((f) => (
                <Carousel.Item interval={2000}>
                  <img
                    className="user-recomm-pic"
                    src={f.photoRef}  
                  />
                  <Carousel.Caption>
                    <p className="caption-car">
                      {f.placeName}
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </ListGroup.Item>
        </ListGroup>
      </>
      {/* <>
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
                </div>
              </div>
              <button className="followButton">Follow</button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </> */}
    </div>
  ) : null;
}
