import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../store/Actions/user";
import { getAllPosts } from "../../store/Actions/post";
import { Col, Row, Container } from "react-bootstrap";
import FeedCard from "../../components/FeedCard/FeedCard"
import AddPostCard from "../../components/AddPostCard/AddPostCard";
import { CircularProgress } from "@material-ui/core";
import "../../App.css"
import "../styles.css"
import UserRecommendation from "../../components/UserRecommendation/UserRecommendation";
import { getAllComments } from "../../store/Actions/comment";
export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
    dispatch(getAllPosts());
    dispatch(getAllComments())
  }, []);

  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.post.allPosts);

  return user && posts ? (
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
