import { Avatar } from "@material-ui/core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import { Col, Row } from "react-bootstrap";
import "../styles.css";
import { IconButton } from "@material-ui/core";
import CommentList from "../commentList/CommentList";
import { addComment } from "../../store/Actions/comment";
import { likePost,getLikes } from "../../store/Actions/like";

export default function AddComment({ postId }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.allComments);
  const currentUser = useSelector((state) => state.user.user);
  const isLiked = useSelector((state) => state.like.isLiked);
  const [comment, setComment] = useState("");

  const postComment = (event, comment) => {
    event.preventDefault();
    dispatch(addComment(postId, comment));
    setComment("");
  }; 

  window.onload = () => (dispatch(getLikes(postId)))

  const comm = comments.filter(c => c.postId === postId)
  const liked = isLiked.includes(currentUser._id)
  console.log(liked,"if the user is in the array")

  console.log(liked, "if the current user is here ")
  return (
    <>
      <Row>
        <Col className="col-post-action">
          <IconButton onClick={() => dispatch(likePost(postId))}>
           {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <p className="text-muted amount mt-3">{isLiked.length}</p>
          <IconButton>
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
              <p className="text-muted amount mt-3">{comm.length}</p> 
        </Col>
      </Row> 
      <CommentList postID={postId} />
      <Row>
        <Col className="comment-action">
          <Avatar
            className="comment-avatar"
            alt={currentUser.name}
            src={currentUser.imgUrl}
          />
          <input
            value={comment}
            className="comment-input"
            type="text"
            onChange={(e) => setComment(e.target.value)}
          />{" "}
          <button
            style={
              comment.length > 2 ? { display: "block" } : { display: "none" }
            }
            className="post-comment"
            onClick={(e) => postComment(e, comment)}
          >
            Post
          </button>
        </Col>
      </Row>
    </>
  );
}
