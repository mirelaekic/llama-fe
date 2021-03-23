import React from 'react'
import { Card,Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'
import Search from '../Search/Search'
import "./HomeNav.css"
import llamaLogo8 from "../../icon/llamaLogo8.jpg";
import llamaLogoX from "../../icon/llamaLogoX.jpg";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Avatar, IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';

export default function HomeNav() {
    const user = useSelector((state) => state.user.user);
    return user ? (
        <Navbar className="top-navbar">
    <Nav className="mr-auto search-navbar">
    <Form inline>
     <Search />
    </Form>
    </Nav>
     <Nav className="ml-auto">
        <Nav.Item>
              <IconButton><NotificationsIcon /></IconButton>
               </Nav.Item> 
        <Nav.Item className="navbar-user">
            <Avatar className="navbar-avatar" src={user.imgUrl} alt={user.name} />
        </Nav.Item>

    </Nav> 
  </Navbar>
    ) : null
}
