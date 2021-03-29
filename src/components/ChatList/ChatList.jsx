import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux";
import { getOneRoom } from '../../store/Actions/rooms';
import MessageContainer from '../MessageContainer/MessageContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));
export default function ChatList() {
const rooms = useSelector((state) => state.rooms.allRooms)
const user = useSelector((state) => state.user.user)
const room = useSelector((state) => state.rooms.singleRoom)
const dispatch = useDispatch()
const getRoomID = (id) => {
    console.log(id, "room id")
    dispatch(getOneRoom(id))
}

console.log(rooms,"all the rooms")
console.log(room,"SINGLE room----------")

const classes = useStyles();
  return rooms ? (
    <List className={classes.root}>
        {rooms.map((m,i) => (
            <>
        <MessageContainer roomId={m._id} />
        <ListItem key={i} onClick={() => getRoomID(m._id)} alignItems="flex-start">
        <ListItemAvatar>
           
            {/* {room.members.map((u,i) => (
                <Avatar alt={u.username} src="/static/images/avatar/1.jpg" /> 
            ))} */}
        </ListItemAvatar>
        <ListItemText
          primary= {m.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
            </>
        ))}
    </List>
  ) : null;
}
