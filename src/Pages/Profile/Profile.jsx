import React from 'react'
import FeedCard from '../../components/FeedCard/FeedCard'
import { Col, Row, Container } from "react-bootstrap";
import SideBar from '../../components/SideBar/SideBar';
import AddPostCard from '../../components/AddPostCard/AddPostCard';
import Search from '../../components/Search/Search';
import UserRecommendation from '../../components/UserRecommendation/UserRecommendation';
import { Button, CircularProgress, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import HomeNav from '../../components/HomeNav/HomeNav';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import ProfileTab from '../../components/ProfileTab/ProfileTab';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ProfileDetailCard from '../../components/ProfileDetailCard/ProfileDetailCard';
export default function Profile() {
    const user = useSelector((state) => state.user.user);
    return user ? (
        <Container>
          <Row>
            <Col className="home-column" lg={12} md={8}>
              <ProfileHeader />
              <Row>
                  <Col lg={4} className="d-xs-none d-sm-none d-md-block d-lg-block">
                    <ProfileDetailCard />
                  </Col>
                  <Col lg={8}>
                      <div className="profile-info">
                        <Row>
                            <Col ><h2 className="profile-username">{user.name} {user.surname} </h2>
                            <p className="text-muted profile-detail"><LocationOnIcon /> location</p></Col>
                            <Col>
                            <div className="profile-action-button">
                            <Button><ChatBubbleIcon /> </Button>
                            </div>
                            </Col>
                            </Row>
                      </div>
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
