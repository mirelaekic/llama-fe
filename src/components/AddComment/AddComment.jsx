import { Avatar } from "@material-ui/core";
import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import "../styles.css"
import {getAllComments,addComment} from "../../store/Actions/comment"
export default function AddComment({postId}) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState("")
useEffect(() => {
   // dispatch(getAllComments(postId))
}, [])
const comments = useSelector((state) => state.comment.allComments);
console.log(comments,"all comments")
const postComment = (event,comm) => {
    console.log(comm,"THE COMMENT TO POST")
    event.preventDefault()
    dispatch(addComment(postId,comm))
    setComment("")
    dispatch(getAllComments(postId))
}   

    console.log(postId,"this is the post Id of the comment")
    const user = useSelector((state) => state.user.user);
console.log(comment,"comment")
  return (
    <Row>
    <Col className="comment-action">
        <Avatar className="comment-avatar" alt={user.name} src={user.imgUrl}/>
      <input className="comment-input" type="text" onChange={(e) => setComment(e.target.value)} />{" "}
      <button className="post-comment" onClick={(e) => postComment(e,comment)}>Post</button></Col>
    </Row>
  );
}
