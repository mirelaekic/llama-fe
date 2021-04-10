import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./ExploreModal.css";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    width: "25rem",
    height: "25rem",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function ExploreModal() {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.user);
  const allUsers = useSelector((state) => state.user.allUsers);
  const [checked, setChecked] = React.useState(new Map());
  const [name, setName] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
console.log(allUsers,"all users")
  const filteredUsers = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(name.toLowerCase()) || user.surname.toLowerCase().includes(name.toLowerCase());
  });
  const handleChange = (event) => {
    var isChecked = event.target.checked;
    var item = event.target.value;
    setChecked(prevState => prevState.set(item,isChecked))
  };

  return (
    allUsers && (
      <div>
        <Button 
        className="invite-btn" 
        onClick={handleClickOpen}>
          invite friend
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>
            <input 
            className="explore-search-modal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" placeholder="Search..." />
          </DialogTitle>
          <DialogContent>
            <Grid item xs={12} md={12} lg={12}>
              <div className={classes.demo}>
                <List>
                  {filteredUsers.map((user, i) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={user.imgUrl} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.name + " " + user.surname}
                        secondary="Secondary text"
                      />
                      <ListItemSecondaryAction>
                        <input
                        type="checkbox"
                          edge="end"
                          value={user._id}
                          id={user._id}
                          onChange={handleChange}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
}
