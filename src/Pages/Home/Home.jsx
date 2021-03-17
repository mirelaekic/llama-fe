import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, logoutAction } from "../../store/Actions/user";
import { Redirect } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import { Col, Row,Container } from "react-bootstrap";
import HomeNav from "../../components/HomeNav/HomeNav"
import Search from "../../components/Search/Search"
import AddPostCard from "../../components/AddPostCard/AddPostCard"
export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(getMe());
  }, []);

  const user = useSelector((state) => state.user.authorized);
console.log(user,"is user auth")
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
  };
  return (
    <Container>
    <Row>
      <Col lg={3}>
      <SideBar />
      </Col>
      <Col lg={6}>
        <HomeNav />
      <button onClick={handleLogout}>LOGOUT</button>
      <AddPostCard />
      </Col>
      <Col lg={3}                       >
          <Search />
      </Col>
      </Row>
      </Container>
  ) 
}
