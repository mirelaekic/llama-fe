import { Button } from '@material-ui/core'
import React from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import "./ProfileDetail.css"
import { Row } from 'react-bootstrap';

export default function ProfileDetailCard() {
    return (
        <div className="mt-4">
            <Button className="follow-button"><PersonAddIcon /> follow</Button>
            <Row>
            carousel with tiny stickers with followers
            </Row>
            <Row>
            carousel with tiny stickers with following
            </Row>
        </div>
    )
}
