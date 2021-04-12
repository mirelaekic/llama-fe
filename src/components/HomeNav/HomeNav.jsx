import React from "react";
import { Card, Nav, Navbar, Form } from "react-bootstrap";
import Search from "../Search/Search";
import "./HomeNav.css";
import llamaLogo8 from "../../icon/llamaLogo8.jpg";
import llamaLogoX from "../../icon/llamaLogoX.jpg";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Avatar, IconButton, Button, Menu, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../store/Actions/user";
import { Link } from "react-router-dom";
import NotificationCenter from 'react-notification-center-component';
 
export default function HomeNav() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }; 
  const user = useSelector((state) => state.user.user);
  return user ? (
    <Navbar className="top-navbar">
      <Nav className="search-navbar">
        <Form inline>
          <Search />
        </Form>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Item className="notification-icon">
        <NotificationCenter className="myCustomClass" appId="lXZv5nOYzh" subscriberId={currentUser._id}/>
        </Nav.Item>
        <Nav.Item className="navbar-user">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Avatar
              className="navbar-avatar"
              src={user.imgUrl}
              alt={user.name}
            />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link className="profile-link" to="profile/me">
            <MenuItem>Profile</MenuItem>
            </Link>
            <MenuItem onClick={() => dispatch(logoutAction())}>Logout</MenuItem>
          </Menu>
        </Nav.Item>
      </Nav>
    </Navbar>
  ) : null;
}
