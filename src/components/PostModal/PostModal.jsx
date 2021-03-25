import React,{useState} from "react";
import "../styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Avatar, Button, CircularProgress } from "@material-ui/core";
import { Col, Row, InputGroup, FormControl } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import GifIcon from "@material-ui/icons/Gif";
import ImageIcon from "@material-ui/icons/Image";
import MoodIcon from "@material-ui/icons/Mood";
import { useDispatch, useSelector } from "react-redux";
import {uploadPost, getAllPosts} from "../../store/Actions/post"
import AddBoxIcon from '@material-ui/icons/AddBox';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "35rem",
    padding: "16px 32px 10px",
    backgroundColor: theme.palette.background.paper,
    border: "2px strong #000",
    borderRadius:"30px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    display: "none",
  },
}));

export default function PostModal() {

  const user = useSelector((state) => state.user.user);
  const classes = useStyles();
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [postImg, setPostImg] = useState()  
  const [preview, setPreview] = useState()
  const [description, setDescription] = useState("")
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addPost = (event,pic,desc) => {
      event.preventDefault()
      dispatch(uploadPost(pic,desc))
      setOpen(false)
      setDescription("")
      setPostImg(null)
  }

  const url = postImg ? URL.createObjectURL(postImg) : ""
  return user ? (
    <>
      {window.location.pathname === "/" ? <button onClick={handleOpen} className="post-input">
        <AddBoxIcon />New post
      </button> : <Button onClick={handleOpen}>Add new post</Button>}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h5 className="modal-title" id="transition-modal-title">
              <strong>Create a post</strong>
            </h5>
            <hr />
            <div>
              <div className="user-info">
                <Avatar alt={user.name} src={user.imgUrl} />
                <div className="user ml-2">
                  {user.name} {user.surname}
                </div>
              </div>
              <InputGroup>
                <FormControl
                  placeholder="What's happening?"
                  className="text-post"
                  as="textarea"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </InputGroup>
            </div>
            <hr />
            <div className="action-buttons">
            {url ? <img className="preview-img" src={url} /> : " "}
              <input
                accept="image/png, image/jpeg, image/jpg"
                //className={classes.input}
                id="icon-button-file"
                type="file"
                id="postImg"
                onChange={(e) => setPostImg(e.target.files[0])}
              />
              <label htmlFor="icon-button-file">
               <IconButton
                  className="upload-button"
                  aria-label="upload picture"
                  component="span"
                >
                  <ImageIcon />
                </IconButton> 
              </label>
              <IconButton className="emoji-button" aria-label="add emoji">
                <MoodIcon />
              </IconButton>
              <IconButton
                color="secondary"
                className="gif-button"
                aria-label="add gif"
              >
                <GifIcon />
              </IconButton>
              <div className="postbtn-area">
                <Button
                  variant="contained"
                  color="secondary"
                  className="post-button"
                  onClick={(e) => addPost(e,postImg,description)}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  ) : (
    <CircularProgress />
  );
}
