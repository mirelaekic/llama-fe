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
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop'
import UserRecommendation from "../../components/UserRecommendation/UserRecommendation";
import { getAllComments } from "../../store/Actions/comment";
import { getFavPlace } from "../../store/Actions/explore";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'black',
  },
}));
export default function Home() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getMe());
    dispatch(getAllPosts());
    dispatch(getAllComments())
    dispatch(getFavPlace())
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
    <Backdrop className={classes.backdrop} open={true}>
    <CircularProgress color="inherit" />
    </Backdrop>
  );
}
