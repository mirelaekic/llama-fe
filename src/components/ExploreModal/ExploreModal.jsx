import React, { useState } from "react";
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
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from '@material-ui/core/Checkbox';
import Moment from 'react-moment';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import { Col, Row } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
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
    height: "35rem",
  },
  root1: {
    // position: "fixed",
    // top:" 7rem",
    // left:" 25.9rem",
    // width: "431px",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    backgroundColor: "#00ad00b3",
    padding: "1rem",
    marginTop: "4rem",
    borderRadius: "3rem",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));
function getSteps() {
  return ["Invite", "Pick a date", "Overview"];
}

export default function ExploreModal() {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.user);
  const allUsers = useSelector((state) => state.user.allUsers);
  const details = useSelector((state) => state.explore.singleResult.result);
  const placeImg = useSelector((state) => state.explore.photo);
  const [checked, setChecked] = React.useState([]);
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const removeMe = allUsers.filter((user) => user._id !== currentUser._id)
  const filteredUsers = removeMe.filter((user) => {
    return (
      user.name.toLowerCase().includes(name.toLowerCase()) ||
      user.surname.toLowerCase().includes(name.toLowerCase())
    );
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if(activeStep === steps.length){
      handleReset()
      setOpen(false)
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setChecked([])
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  console.log(checked,"the checked")
  const filterAdded = allUsers.filter((user) => {
    return checked ? checked.find((id) => {
      return user._id === id
    }) : null
  })
  console.log(filterAdded,"the filtered")
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Grid item xs={12} md={12} lg={12}>
            <div className={classes.demo}>
              <List>
                {filteredUsers.map((user, i) => (
                  <ListItem key={user._id}>
                    <ListItemAvatar>
                      <Avatar src={user.imgUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name + " " + user.surname} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(user._id)}
                        checked={checked.indexOf(user._id) !== -1}
                        inputProps={{ "aria-labelledby": user._id }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
        );
      case 1:
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Set date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                ampm={false}
                variant="inline"
                label="Set time"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        );
      case 2:
        return (
          <div className="place-title-img">
            <Row>
              <Col>
                <img className="explore-img" src={placeImg.url} />
              </Col>
              <Col>
              <div className="place-info">
                <h6 className="place-title mt-3">{details.name}</h6>
                <p className="text-muted place-address">{details.formatted_address}</p>
                </div>
              </Col>
            </Row>
            <Row className="users-time mt-4">
          <Col className="time">
            <Moment format="D MMM YYYY">{selectedDate}</Moment> <br/>
            <Moment format="h:mm a">{selectedDate}</Moment>
          </Col>
              <Col>
              <AvatarGroup className="avatar-group" max={checked.length}>
                  {filterAdded.map((u,i) => (
                    <Tooltip arrow title={u.name + " " + u.surname}>
                      <Avatar key={i} alt={u.name} src={u.imgUrl} />
                    </Tooltip>
                  ))}
              </AvatarGroup>
              </Col>
            </Row>
          </div>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    allUsers && (
      <div>
        <Button className="invite-btn" onClick={handleClickOpen}>
          invite friend
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>
          <IconButton className="exit-btn" onClick={handleClose} color="primary">
          <CloseIcon />
            </IconButton>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 ? (
              <input
                className="explore-search-modal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Search..."
              />
            ) : null}
          </DialogTitle>
          <DialogContent>
            <div>
              {activeStep === steps.length ? (
                  <Typography className={classes.instructions}>
                    Invitation sent!{" "}
                  </Typography>
              ) : (
                <Typography>
                  {getStepContent(activeStep)}
                </Typography>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            <Button variant="contained" className="next-btn" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Send" : "Next"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
}
