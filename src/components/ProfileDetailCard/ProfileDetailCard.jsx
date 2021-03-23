import { Button } from '@material-ui/core'
import React from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import "./ProfileDetail.css"
import { Row,Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function ProfileDetailCard(props) {
    const params = props.props.match.params.id
    const userByID = useSelector((state) => state.user.getUserById)
    console.log(userByID,"the user in details")
    console.log(props,"the props in the detail card")

    return (
        <div className="profile-details-column">
            {
                params === "me" ? null :  <Button className="follow-button"><PersonAddIcon /> follow</Button>
            }
            <Row>
            <Col>following 1231</Col>
            <Col>followers  231</Col>
            </Row>
        </div>
    )
}
