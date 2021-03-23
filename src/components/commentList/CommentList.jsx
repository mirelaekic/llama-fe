import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { getAllComments } from "../../store/Actions/comment";
import Moment from "react-moment";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "-webkit-fill-available",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
    fontWeight: "bold",
  },
  comment: {
    marginLeft: "5px",
    display: "inline",
  },
}));

export default function CommentList({ postID }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.allPosts);
  const comments = useSelector((state) => state.comment.allComments);
  const users = useSelector((state) => state.user.allUsers);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllComments());
  }, []);

  return (
    <>
      <List className={classes.root}>
        {comments.map((c, i) => (
          <>
            {c.postId === postID ? (
              <ListItem className="comments" key={i} alignItems="flex-start">
                {users.map((u) => (
                  <>
                    {c.userId === u._id ? (
                      <>
                        <ListItemAvatar>
                          <Avatar alt={u.name} src={u.imgUrl} />
                        </ListItemAvatar>
                        <ListItemText
                        className="comment-lists"
                          primary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                {u.name} {u.surname}
                              </Typography>
                              <Typography
                                component="span"
                                className={classes.comment}
                                color="textPrimary"
                              >
                                {c.comment}
                              </Typography>
                            </React.Fragment>
                          }
                          secondary={<Moment fromNow>{c.createdAt}</Moment>}
                        />
                      </>
                    ) : (
                      " "
                    )}
                  </>
                ))}
              </ListItem>
            ) : (
              " "
            )}
          </>
        ))}
      </List>
    </>
  );
}
