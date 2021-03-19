import { Avatar, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import "../styles.css"
import { Card, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/Actions/user";
import Moment from "react-moment"
import AddComment from "../AddComment/AddComment"
import { likePost,getLikes } from "../../store/Actions/like";
import { IconButton } from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
export default function FeedCard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const comments = useSelector((state) => state.comment.allComments);
  const isLiked = useSelector((state) => state.like.isLiked)
  const posts = useSelector((state) => state.post.allPosts);
  const allUsers = useSelector((state) => state.user.allUsers);
  const comm = comments.filter(c => c.postId === postID)
  const liked = isLiked.includes(currentUser._id)
  console.log(isLiked,"the post that is liked")
  console.log(liked,"if the user is in the array")
  return (
    <>
      {posts ?
        posts.map((p, i) => (
          <>
          <Card key={i} className="mt-2 mb-2" style={{ width: "auto" }}>
            <Card.Header className="user-info ml-2">
              {allUsers && allUsers.map((user, i) =>
                user._id === p.userId ? (
                  <>
                  <Row key={i}>
                    <Avatar alt={user.name} src={user.imgUrl}/>
                    <div key={i} className="post-info">
                    <p className="ml-2">
                      {" "}
                      <strong>
                        {user.name} {user.surname}
                      </strong>{" "}
                    </p>
                    <p className="posted-at ml-2 text-muted"><Moment fromNow>{p.updatedAt}</Moment></p></div>
                    </Row> 
                  </>
                ) : (
                  " "
                )
              )}
            </Card.Header>
            {p.description ? <Card.Header className="description"><p className="ml-4">{p.description}</p></Card.Header> : ""}
            {p.postImg ? <Card.Img variant="top" src={p.postImg} /> : " "}
            <Card.Body className="comment-like">
            {/**likes */}
             <AddComment postId={p._id} />
            </Card.Body>
          </Card>
          <Row>
        <Col className="col-post-action">
          <IconButton onClick={() => dispatch(likePost(postId))}>
           {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <h6 onClick={()=> dispatch(getLikes(postId))}>h</h6>
          <p className="text-muted amount mt-3">{isLiked.length}</p>
          <IconButton>
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
              <p className="text-muted amount mt-3">{comm.length}</p> 
        </Col>
      </Row> 
          </>
        )) : <CircularProgress/>}
    </>
  );
}
