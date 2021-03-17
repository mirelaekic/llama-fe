import React from "react";
import "../styles.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider";
import llamaLogo8 from "../../icon/llamaLogo8.jpg";
import { Link, withRouter } from "react-router-dom";
import PlaceIcon from '@material-ui/icons/Place';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon  from "@material-ui/icons/Home";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

 function SideBar() {
  return (
    <div className="sidebar">
      <List component="nav" aria-label="main mailbox folders">
        <ListItem className="sidebar-logo"> 
            <Link to="/"><img className="login-logo" src={llamaLogo8} /></Link>
        </ListItem>
        <ListItem button className=" sidebar-item">
          <ListItemIcon className="sidebar-icon">
            <HomeIcon />
          </ListItemIcon>
          <ListItemText className="sidebar-link" primary="Home" />
        </ListItem>
        <ListItem button className=" sidebar-item">
          <ListItemIcon className="sidebar-icon">  
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText className="sidebar-link" primary="Explore" />
        </ListItem>
        <ListItem button className=" sidebar-item">
          <ListItemIcon className="sidebar-icon">
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText className="sidebar-link" primary="Notifications" />
        </ListItem>
        <ListItem button className="sidebar-item">
          <ListItemIcon className="sidebar-icon">
            <EmailIcon />
          </ListItemIcon>
          <ListItemText className="sidebar-link" primary="Messages" />
        </ListItem>
        <ListItem button className=" sidebar-item">
          <ListItemIcon className="sidebar-icon">
            <PersonIcon />
          </ListItemIcon>
          <ListItemText className="sidebar-link" primary="Profile" />
        </ListItem>
      </List>
      <Divider />
      <ListItem button className=" sidebar-item">
          <ListItemIcon className="sidebar-icon">
            <PersonIcon />
          </ListItemIcon>
          <ListItemText className="sidebar-link" primary="User" />
        </ListItem>
    </div>
  );
}

export default withRouter(SideBar)
