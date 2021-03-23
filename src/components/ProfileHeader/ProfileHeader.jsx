import { Avatar } from "@material-ui/core";
import React from "react";
import {Jumbotron,Container} from "react-bootstrap"
import { useSelector } from "react-redux";
import SettingsModal from "../SettingsModal/SettingsModal";
import "./ProfileHeader.css"

export default function ProfileHeader() {
    const user = useSelector((state) => state.user.user)
  return user ? (
    <div>
      <Jumbotron fluid className="profile-jumbotron ">
        <Container>
        <SettingsModal />
          <div className="avatar-position">
          <Avatar className="jumbotron-avatar img-fluid" src={user.imgUrl} alt={user.name} />
          </div> 
        </Container>
      </Jumbotron>
    </div>
  ) : null;
}
