import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import "./ProfileDetail.css";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getMe, getUserById, unfollowUser } from "../../store/Actions/user";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SettingsModal from "../SettingsModal/SettingsModal";
import PostModal from "../PostModal/PostModal";
import { getAllPosts } from "../../store/Actions/post";
export default function ProfileDetailCard(props) {
    useEffect(() => {
      dispatch(getAllPosts());
      dispatch(getMe());
      dispatch(getUserById(params))
    }, []);
  const params = props.props.match.params.id;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const userByID = useSelector((state) => state.user.getUserById);
  console.log(params,"the user by id")
  const posts = useSelector((state) => state.post.allPosts);

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
  const filterMyPosts =
    posts && posts.filter((p) => p.userId === currentUser._id).length;
  const filterUserPosts =
    posts && posts.filter((p) => p.userId === userByID._id).length;

  const filterMyFollowers = () => {
      if(currentUser){
          const
          return
      }
  }
   currentUser && currentUser.followers.length;
  const filterUserFollowers =userByID && userByID.followers.length;
  const filterMyFollowing = currentUser && currentUser.following.length;
  const filterUserFollowing = userByID && userByID.following.length;

  return currentUser && userByID ? (
    <div className="profile-details-column">
      <p className="text-muted profile-location">
        <LocationOnIcon /> location
      </p>

      {params === "me" ? (
        <p className="user-description">{currentUser.description}</p>
      ) : (
        <p className="user-description">{userByID.description}</p>
      )}
      <Row className="mt-2">
        <Col>
          {params === "me" ? (
            <strong>{filterMyFollowing}</strong>
          ) : (
            <strong>{filterUserFollowing}</strong>
          )}
          <p className="text-muted">Following</p>
        </Col>
        <Col>
          {params === "me" ? (
            <strong>{filterMyFollowers}</strong>
          ) : (
            <strong>{filterUserFollowers}</strong>
          )}{" "}
          <p className="text-muted">Followers</p>
        </Col>
        <Col>
          {params === "me" ? (
            <strong>{filterMyPosts}</strong>
          ) : (
            <strong>{filterUserPosts}</strong>
          )}{" "}
          <p className="text-muted">Posts</p>
        </Col>
      </Row>
      {params === "me" ? null : filterFollowing(userByID._id) === undefined ? (
        <Button
          className="follow-button"
          onClick={() => followTheUser(userByID._id)}
        >
          <PersonAddIcon /> follow
        </Button>
      ) : (
        <Button
          className="unfollow-button"
          onClick={() => unfollowTheUser(userByID._id)}
        >
          <PersonAddDisabledIcon /> unfollow
        </Button>
      )}
      <div className="profile-buttons">
        {params === "me" ? (
          <>
            <PostModal />
            <SettingsModal />
          </>
        ) : null}
        {params === "me" ? "" : <Button>Message</Button>}
      </div>
    </div>
  ) : null;
}
