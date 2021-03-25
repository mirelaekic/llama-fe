import React,{useEffect} from 'react'
import { Col, Row, Container } from "react-bootstrap";
import {  CircularProgress, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import ProfileTab from '../../components/ProfileTab/ProfileTab';
import ProfileDetailCard from '../../components/ProfileDetailCard/ProfileDetailCard';
import { getMe } from '../../store/Actions/user';
import { getAllPosts } from '../../store/Actions/post';
import { getAllComments } from '../../store/Actions/comment';
export default function Profile(props) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
      dispatch(getMe());
      dispatch(getAllPosts())
      dispatch(getAllComments())
    }, []);

    const userByID = useSelector((state) => state.user.getUserById)
    const params = props.match.params.id
    return user && userByID ? (
        <Container>
          <Row>
            <Col className="home-column" lg={12} md={8}>
              <ProfileHeader props={props}/>
              <Row>
                  <Col lg={4} md={12} sm={12} className="d-xs-none d-sm-none d-md-block d-lg-block mt-3">
                      <div className="profile-info">
                        <Row>
                            <Col ><h2 className="profile-username">{params === "me" ? user.name : userByID.name} {params === "me" ? user.surname : userByID.surname} </h2></Col>
                            </Row>
                      </div>
                    <ProfileDetailCard props={props}/>
                  </Col>
                  <Col lg={8} md={12} sm={12}>
                    <ProfileTab props={props} />
              </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        <CircularProgress />
      );    
    }
