import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/Actions/post";
import { getMe } from "../../store/Actions/user";
import "./ProfileAlbum.css";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
    '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
},
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "-webkit-fill-available",
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function ProfileAlbum(params) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getMe());
  }, []);

  const userByID = useSelector((state) => state.user.getUserById);
  const currentUser = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.post.allPosts);

  const filterPosts = () => {
    if (params.parmas === "me") {
      const myPosts = posts && posts.filter((user) => user.userId === currentUser._id);
      return myPosts;
    } else {
      const usersPosts =posts && posts.filter((user) => user.userId === userByID._id);
      return usersPosts;
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        {filterPosts()
          ? filterPosts().map((p, i) => (
              p.postImg === "" ? (null) : (
              <GridListTile key={i}>
                <img src={p.postImg} alt={p.userId} />
                <GridListTileBar
                  title={p.description}
                />
              </GridListTile>
              )
            ))
          : null}
      </GridList>
    </div>
  );
}
