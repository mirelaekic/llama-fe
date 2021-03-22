import React from 'react'
import FeedCard from '../../components/FeedCard/FeedCard'
import { Col, Row, Container } from "react-bootstrap";
import SideBar from '../../components/SideBar/SideBar';
import AddPostCard from '../../components/AddPostCard/AddPostCard';
import Search from '../../components/Search/Search';
import UserRecommendation from '../../components/UserRecommendation/UserRecommendation';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import HomeNav from '../../components/HomeNav/HomeNav';
import ProfileHeader from '../../ProfileHeader/ProfileHeader';

export default function Profile() {
    const user = useSelector((state) => state.user.user);
    return user ? (
        <Container>
          <Row>
             <Col className="sidebar-column" lg={3} md={4}>
              <SideBar />
            </Col> 
            <Col className="home-column" lg={9} md={8}>
              <HomeNav title="PROFILE" />
              <ProfileHeader />
              <Row>
                  <Col lg={4}>
                    <h6>info</h6>
                    <h6>following</h6>

                  </Col>
                  <Col lg={8}>
              <AddPostCard />
            {/**filter by the current user*/}
              <FeedCard />
              </Col>
              </Row>
            </Col>
            {/* <Col lg={3} className="recommendation-column d-xs-none d-sm-none d-md-none d-lg-block" >
              <Search />
              <UserRecommendation />
            </Col> */}
          </Row>
        </Container>
      ) : (
        <CircularProgress />
      );
    }
