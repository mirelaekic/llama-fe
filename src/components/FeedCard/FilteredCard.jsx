import { Avatar, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../styles.css";
import { Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/Actions/user";
import Moment from "react-moment";
import AddComment from "../AddComment/AddComment";
import { likePost, getLikes } from "../../store/Actions/like";
import { IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../store/Actions/post";
export default function FilteredCard(params) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts())
    dispatch(getUsers());
    dispatch(getLikes())
  }, []);

  const currentUser = useSelector((state) => state.user.user);
  const comments = useSelector((state) => state.comment.allComments);
  const isLiked = useSelector((state) => state.like.isLiked);
  const posts = useSelector((state) => state.post.allPosts);
  const allUsers = useSelector((state) => state.user.allUsers);
  const userByID = useSelector((state) => state.user.getUserById)

  const ifUserLiked = (id) => {
   const filterByPost = isLiked.filter((c) => c.postId === id)
   const ifIncludesCU = filterByPost.find((user) => user.user === currentUser._id)
   if(ifIncludesCU === undefined) {
     return false
   } else {
     return true
   }
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
 const filterPosts = () =>{
      if (params.params === "me") {
        const myPosts =  posts.filter((user) => user.userId === currentUser._id)
        return myPosts
      } else {
        const usersPosts = posts.filter((user) => user.userId === userByID._id)
        return usersPosts
      }
    }
  return (
    <>
      {filterPosts() ? (
        filterPosts().map((p, i) => (
          <>
            <Card key={i} className="post-card mb-2" style={{ width: "auto" }}>
              <Card.Header className="user-info ml-2">
                {allUsers &&
                  allUsers.map((user, i) =>
                    user._id === p.userId ? (
                      <>
                        <Row key={i}>
                          <Avatar alt={user.name} src={user.imgUrl} />
                          <div key={i} className="post-info">
                            <p className="ml-2">
                              {" "}
                              <strong>
                                {user.name} {user.surname}
                              </strong>{" "}
                            </p>
                            <p className="posted-at ml-2 text-muted">
                              <Moment fromNow>{p.createdAt}</Moment>
                            </p>
                          </div>
                        </Row>
                      </>
                    ) : (
                      " "
                    )
                  )}
              </Card.Header>
              {p.description ? (
                <Card.Header className="description">
                  <p className="ml-4">{p.description}</p>
                </Card.Header>
              ) : (
                ""
              )}
              {p.postImg ? <Card.Img variant="top" src={p.postImg} /> : " "}
              <Card.Body className="comment-like">
                <Row>
                  <Col className="col-post-action">
                    <IconButton className="like-button" key={p._id} onClick={() => dispatch(likePost(p._id))}>
                      {ifUserLiked(p._id) ? <FavoriteIcon className="liked-button" /> : <FavoriteBorderIcon className="not-liked" />}
                    </IconButton>
                    <p className="text-muted amount mt-3">{isLiked.filter((l) => l.postId === p._id).length}</p>
                    <IconButton onClick={handleOpen}>
                      <ChatBubbleOutlineRoundedIcon className="comment-button" />
                    </IconButton>
                    <p className="text-muted amount mt-3">
                      {comments.filter((c) => c.postId === p._id).length}
                    </p>
                  </Col>
                </Row>
                {/**likes */}
               {open ? 
                (<AddComment postId={p._id} />) : null
                }
              </Card.Body>
            </Card>
          </>
        )) 
      ) : (
        <CircularProgress />
      )}
    </>
  );
}