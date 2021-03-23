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
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import ProfileTab from '../../components/ProfileTab/ProfileTab';

export default function Profile() {
    const user = useSelector((state) => state.user.user);
    return user ? (
        <Container>
          <Row>
            <Col className="home-column" lg={12} md={8}>
              <ProfileHeader />
              <Row>
                  <Col lg={4}>
                    <h6>info</h6>
                    <h6>following</h6>

                  </Col>
                  <Col lg={8}>
                    <ProfileTab />
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
