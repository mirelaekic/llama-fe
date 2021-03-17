import { Avatar, Card, CardContent } from "@material-ui/core";
import React from "react";
import { Col, Row } from "react-bootstrap";
import "../styles.css";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import EventIcon from '@material-ui/icons/Event';
import GifIcon from '@material-ui/icons/Gif';
import PostModal from "../PostModal/PostModal"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function AddPostCard() {
  const classes = useStyles();

  return (
    <Card className="post-card">
      <CardContent>
        <Row className="modal-row">
          <Col lg={1}>
            <Avatar src="current user" />
          </Col>
          <Col lg={11}>
            <PostModal
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            {" "}
            <div className="action-btn">
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera /> Photo
                </IconButton>
              </label>
            </div>
          </Col>
          <Col>
            <div className="action-btn">
              <IconButton color="secondary" aria-label="add event">
                <EventIcon /> Event
              </IconButton>
            </div>
          </Col>
        </Row>
      </CardContent>
    </Card>
  );
}
