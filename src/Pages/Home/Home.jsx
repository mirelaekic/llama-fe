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
export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
    dispatch(getAllPosts());
  }, []);

  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.post.allPosts);
  console.log(user, "is user auth");
  console.log(posts, "ALL POSTS");
  return user ? (
    <Container>
      <Row>
        <Col lg={3}>
          <SideBar />
        </Col>
        <Col lg={6}>
          <HomeNav />
          <AddPostCard />
          <FeedCard />
        </Col>
        <Col lg={3}>
          <Search />
        </Col>
      </Row>
    </Container>
  ) : (
    <CircularProgress />
  );
}
