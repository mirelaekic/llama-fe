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
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Dropdown } from "react-bootstrap";
import { removePost } from "../../store/Actions/post";

export default function FeedCard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getLikes());
  }, []);

  const currentUser = useSelector((state) => state.user.user);
  const comments = useSelector((state) => state.comment.allComments);
  const isLiked = useSelector((state) => state.like.isLiked);
  const posts = useSelector((state) => state.post.allPosts);
  const allUsers = useSelector((state) => state.user.allUsers);

  //if user liked the post
  const ifUserLiked = (id) => {
    const filterByPost = isLiked.filter((c) => c.postId === id);
    const ifIncludesCU = filterByPost.find(
      (user) => user.user === currentUser._id
    );
    if (ifIncludesCU === undefined) {
      return false;
    } else {
      return true;
    }
  };
  const [open, setOpen] = useState(false);
  const locationPath = window.location.pathname;

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  //Show posts only from the users I am following
   const filterByFollowing = posts.filter((f) => {
     return currentUser.following.find((u) => {
       return f.userId === u.user 
     })
   })

  //Add to the home page posts from the current user as well
  const myPosts = posts.filter((p) => { return p.userId === currentUser._id})
  const newArray = filterByFollowing.concat(myPosts)

  //sort all posts by the date  
   const byDate = newArray.sort((a,b) => {
     return new Date(b.createdAt) - new Date(a.createdAt)
   })
   console.log(byDate.length, "the length of array ")
  return (
    <>
      {posts ? (
        byDate.length === 0 ? <h4 className="noPosts-header">Oh no!😱<br /> Your feed is empty, follow other users to see more on your feed </h4> :
        byDate.map((p, i) => (
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
                              <Link
                                to={
                                  currentUser._id === p.userId
                                    ? "/profile/me"
                                    : "profile/" + user._id
                                }
                              >
                                <strong>
                                  {user.name} {user.surname}
                                </strong>{" "}
                              </Link>
                            </p>
                            <p className="posted-at ml-2 text-muted">
                              <Moment fromNow>{p.createdAt}</Moment>
                            </p>
                          </div>
                        </Row>

                        <div className="ml-auto">
                          <Dropdown>
                            <Dropdown.Toggle className="dropdown-btn"> 
                              <IconButton>
                                <MoreHorizIcon />
                              </IconButton>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                             {currentUser._id === p.userId ? null : <Dropdown.Item>
                                Unfollow {user.name} {user.surname}
                              </Dropdown.Item>}
                             {currentUser._id === p.userId ?
                              ( <>
                              <Dropdown.Item onClick={() => dispatch(removePost(p._id))}>
                                Delete post
                              </Dropdown.Item>
                              </>) : null}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </>
                    ) : (
                      " "
                    )
                  )}
              </Card.Header>
              {p.description ? (
                <Card.Header className="description">
                  <p className="ml-4 mr-3">{p.description}</p>
                </Card.Header>
              ) : (
                ""
              )}
              {p.postImg ? <Card.Img variant="top" src={p.postImg} /> : " "}
              <Card.Body className="comment-like">
                <Row>
                  <Col className="col-post-action">
                    <IconButton
                      className="like-button"
                      key={p._id}
                      onClick={() => dispatch(likePost(p._id))}
                    >
                      {ifUserLiked(p._id) ? (
                        <FavoriteIcon className="liked-button" />
                      ) : (
                        <FavoriteBorderIcon className="not-liked" />
                      )}
                    </IconButton>
                    <p className="text-muted amount mt-3">
                      {isLiked.filter((l) => l.postId === p._id).length}
                    </p>
                    <IconButton onClick={handleOpen}>
                      <ChatBubbleOutlineRoundedIcon className="comment-button" />
                    </IconButton>
                    <p className="text-muted amount mt-3">
                      {comments.filter((c) => c.postId === p._id).length}
                    </p>
                  </Col>
                </Row>
                {/**likes */}
                {open ? <AddComment postId={p._id} /> : null}
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
