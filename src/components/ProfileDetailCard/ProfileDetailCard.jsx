import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import "./ProfileDetail.css";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getMe, getUserById, unfollowUser } from "../../store/Actions/user";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SettingsModal from "../SettingsModal/SettingsModal";
import PostModal from "../PostModal/PostModal";
import { getAllPosts } from "../../store/Actions/post";
import axios from "axios";

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
  const posts = useSelector((state) => state.post.allPosts);

  const followTheUser = async (id) => {
    try {
      dispatch(followUser(id));
      const datatoSend = {
        follower:currentUser.name + " " + currentUser.surname,
      }
      let ep = `https://api.ravenhub.io/company/lXZv5nOYzh/subscribers/${id}/events/XFOaeYDPAH`
      const sendNoti = await axios.post(ep,datatoSend, { "priority" : "Critical" }, {
        headers: {'Content-type': 'application/json'}
       });
       console.log(sendNoti,"the sent")
       return sendNoti
    } catch (error) {
      console.log(error)
    }
  };
  const unfollowTheUser = async (unfollowid) => {
    dispatch(unfollowUser(unfollowid));
  };
  const filterFollowing = (id) => {
    const ifFollowing = currentUser.following.find((user) => user.user === id);
    if(ifFollowing === undefined){
      return false
    } else{
      return true
    }
  };

  const filterMyPosts =
    posts && posts.filter((p) => p.userId === currentUser._id).length;
  const filterUserPosts =
    posts && posts.filter((p) => p.userId === userByID._id).length;

  const filterMyFollowers = () => {
      if(currentUser){
          const filter = currentUser.followers.length;
          return filter
      } 
  }
  const filterUserFollowers = () => {
      const filter = userByID.followers;
      if(filter){
          const leng = filter.length;
          return leng
      } else {
          return 0
      }
  }
  const filterMyFollowing = () => {
    const arr = currentUser.following;
    if(arr){
        const leng = arr.length;
        return leng
    } else {
        return 0
    }
}
const filterUserFollowing = () => {
    const arr = userByID.following;
    if(arr){
        const leng = arr.length;
        return leng
    } else {
        return 0
    }
}
  return currentUser && userByID ? (
    <div className="profile-details-column">
      {params === "me" ? 
      (currentUser.city || currentUser.country ? <p className="text-muted profile-location">
        <LocationOnIcon /> {currentUser.city}, {currentUser.country}
      </p> : null)
      : 
      (userByID.city || userByID.country ? <p className="text-muted profile-location">
        <LocationOnIcon /> {userByID.city}, {userByID.country}
      </p> : null)}

      {params === "me" ? (
        <p className="user-description">{currentUser.about}</p>
      ) : (
        <p className="user-description">{userByID.about}</p>
      )}
      <Row className="mt-2">
        <Col>
          {params === "me" ? (
            <strong>{filterMyFollowing()}</strong>
          ) : (
            <strong>{filterUserFollowing()}</strong>
          )}
          <p className="text-muted">Following</p>
        </Col>
        <Col>
          {params === "me" ? (
            <strong>{filterMyFollowers()}</strong>
          ) : (
            <strong>{filterUserFollowers()}</strong>
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
      <Row className="profile-buttons">
        {params === "me" ? (
          <>
          <div className="mr-4  ">
            <PostModal />
          </div>
          <div>
            <SettingsModal />
          </div>
          </>
        ) : null}
         {params === "me" ? (
          ""
        ) : (
          <div className="user-profile-btn">
            <Button className="msg-btn mr-4">Message</Button>
          {params === "me" ? null : filterFollowing(userByID._id) ? (
            <Button
              className="unfollow-button"
              onClick={() => unfollowTheUser(userByID._id)}
            >
              <PersonAddDisabledIcon />
            </Button>
          ) : (
            <Button
              className="follow-button"
              onClick={() => followTheUser(userByID._id)}
            >
              <PersonAddIcon />
            </Button>
          )}
          </div>
        )}
      </Row>
    </div>
  ) : null;
}
