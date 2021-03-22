import { Avatar } from "@material-ui/core";
import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import "../styles.css";
import CommentList from "../commentList/CommentList";
import { addComment } from "../../store/Actions/comment";


export default function AddComment({ postId }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const [comment, setComment] = useState("");

  const postComment = (event, comment) => {
    event.preventDefault();
    dispatch(addComment(postId, comment));
    setComment("");
  }; 

  //window.onload = () => (dispatch(getLikes(postId)))


  return (
    <>
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
