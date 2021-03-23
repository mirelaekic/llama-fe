import { Button } from "@material-ui/core";
import React from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import "./ProfileDetail.css";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getMe, unfollowUser } from "../../store/Actions/user";

export default function ProfileDetailCard(props) {
  const params = props.props.match.params.id;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const userByID = useSelector((state) => state.user.getUserById);
  
  console.log(currentUser.followers.length,"the lenght of the following array")
  const followTheUser = async (id) => {
    dispatch(followUser(id));
  };
  const unfollowTheUser = async (unfollowid) => {
    dispatch(unfollowUser(unfollowid));
  };
  const filterFollowing = (id) => {
    const ifFollowing = currentUser.following.find((user) => user.user === id);
    return ifFollowing;
  };

  return currentUser && userByID ? (
    <div className="profile-details-column">
      {params === "me" ? null : filterFollowing(userByID._id) === undefined ? (
        <Button
          className="follow-button"
          onClick={() => followTheUser(userByID._id)}
        >
          <PersonAddIcon /> follow
        </Button>
      ) : (
        <Button
          className="follow-button"
          onClick={() => unfollowTheUser(userByID._id)}
        >
          <PersonAddIcon /> unfollow
        </Button>
      )}
        <Row>
        <Col>
          Following{" "}
          {/* {params === "me"
            ? currentUser.following.length
            : userByID.following.length} */}
        </Col>
        <Col>
          Followers{" "}
          {/* {params === "me"
            ? currentUser.followers.length
            : userByID.followers.length} */}
        </Col> 
      </Row>  
    </div>
  ) : null;
}
