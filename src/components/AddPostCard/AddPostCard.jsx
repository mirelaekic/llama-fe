import { Avatar, Card, CardContent, CircularProgress } from "@material-ui/core";
import React,{useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import "../styles.css";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import EventIcon from '@material-ui/icons/Event';
import PostModal from "../PostModal/PostModal"
import {uploadPost, getAllPosts} from "../../store/Actions/post"

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
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
    const [postImg, setPostImg] = useState()
    const dispatch = useDispatch()
    const addPost = (event,pic) => {
        console.log(pic,"pic")
        event.preventDefault()
        dispatch(uploadPost(pic))
        setPostImg()
    }
    const url = postImg ? URL.createObjectURL(postImg) : ""
  const classes = useStyles();
  const user = useSelector((state) => state.user.user)
  return user ? (
    <Card className="addNewPost post-card">
      <CardContent>
        {/* <Row className="modal-row">
          <Col lg={1} md={2} sm={2} xs={2}>
            <Avatar alt={user.name} src={user.imgUrl} />
          </Col>
          <Col lg={11} md={10} sm={10} xs={10}>
            
          </Col>
        </Row>
        <hr /> */}
        <Row>
          <Col>
          <PostModal
            />
          </Col>
          <Col>
            {" "}
            <div className="action-btn">
              <input
                accept="image/png, image/jpeg, image/jpg"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={(e) => setPostImg(e.target.files[0])}
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
  ) : <CircularProgress />
}
