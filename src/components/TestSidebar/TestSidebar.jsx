import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../styles.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { logoutAction } from "../../store/Actions/user";
import PlaceIcon from "@material-ui/icons/Place";
import EmailIcon from "@material-ui/icons/Email";
import llamaLogo8 from "../../icon/llamaLogo8.jpg";
import { useHistory } from "react-router-dom";
import NotificationCenter from 'react-notification-center-component';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';

export default function TestSidebar() {
  const history = useHistory();

  const user = useSelector((state) => state.user.user);
  return user ? (
    <div>
      <SideNav
        className="sidebar"
        onSelect={(selected) => {
          const to = "/" + selected;
          console.log(to,"path")
          history.push(to);
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="">
          <NavItem eventKey="">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText className="sidebar-text">Home</NavText>
          </NavItem>
          <NavItem eventKey="profile/me">
            <NavIcon>
              <AccountCircleSharpIcon />
            </NavIcon>
            <NavText className="sidebar-text">Explore</NavText>
          </NavItem>
          <NavItem eventKey="explore">
            <NavIcon>
              <PlaceIcon />
            </NavIcon>
            <NavText className="sidebar-text">Explore</NavText>
          </NavItem>
          <NavItem eventKey="chat">
            <NavIcon>
              <EmailIcon />
            </NavIcon>
            <NavText className="sidebar-text">Messages</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  ) : null;
}
