import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../store/Actions/user";
import { getAllPosts } from "../../store/Actions/post";
import { Redirect } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import { Col, Row, Container } from "react-bootstrap";
import HomeNav from "../../components/HomeNav/HomeNav";
import Search from "../../components/Search/Search";
import FeedCard from "../../components/FeedCard/FeedCard"
import AddPostCard from "../../components/AddPostCard/AddPostCard";
import { CircularProgress } from "@material-ui/core";
import "../../App.css"
import "../styles.css"
import UserRecommendation from "../../components/UserRecommendation/UserRecommendation";
import { getAllComments } from "../../store/Actions/comment";
import TestSidebar from "../../components/TestSidebar/TestSidebar";
export default function Home() {
  const [open, setOpen] = React.useState(false);
  const node = React.useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
    dispatch(getAllPosts());
    dispatch(getAllComments())
  }, []);

  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.post.allPosts);

  return user ? (
    <Container className="home-container"> 
      <Row>
        <Col className="home-column" lg={8} md={12}>
          <AddPostCard />
          <h1 className="home-header">Your feed</h1>
          <FeedCard />
        </Col>
        <Col lg={3} className="recommendation-column d-xs-none d-sm-none d-md-none d-lg-block" >
          <UserRecommendation />
        </Col>
      </Row>
    </Container>
  ) : (
    <CircularProgress />
  );
}
