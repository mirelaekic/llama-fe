import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../store/Actions/user";
import SettingsModal from "../SettingsModal/SettingsModal";
import "./ProfileHeader.css";

export default function ProfileHeader(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (matchUser === "me") {
      return user;
    } else {
      dispatch(getUserById(matchUser));
    }
  }, []);
  const prop = props.props;
  const matchUser = prop.match.params.id;
  const user = useSelector((state) => state.user.user);
  const userByID = useSelector((state) => state.user.getUserById);

  return user ? (
    <div>
      <Jumbotron fluid style={{backgroundImage:"url(https://www.incimages.com/uploaded_files/image/970x450/getty_509107562_2000133320009280346_351827.jpg)"}} className="profile-jumbotron ">
        <Container>
          <div className="avatar-position">
            <Avatar
              className="jumbotron-avatar img-fluid"
              src={matchUser === "me" ? user.imgUrl : userByID.imgUrl}
              alt={matchUser === "me" ? user.name : userByID.name}
            />
          </div>
        </Container>
      </Jumbotron>
    </div>
  ) : null;
}
