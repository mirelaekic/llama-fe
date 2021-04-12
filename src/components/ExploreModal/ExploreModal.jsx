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
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import { Col, Row } from "react-bootstrap";
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
  return ["Invite users", "Pick a date", "Overview"];
}

export default function ExploreModal() {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.user);
  const allUsers = useSelector((state) => state.user.allUsers);
  const details = useSelector((state) => state.explore.singleResult.result);
  const placeImg = useSelector((state) => state.explore.photo);
  const [checked, setChecked] = React.useState(new Map());
  const [invited, setInvited] = React.useState()
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const loopChecked = checked.forEach(function(value, key) {
    console.log(key,"the KEY",value,"the value")
    if (value){
     const filtered = allUsers.filter((u) => u._id === key)
     console.log(filtered, "the filtered users ")
    }
  })

  console.log(loopChecked, "checked users ")

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChecked(new Map())
  };

  const filteredUsers = allUsers.filter((user) => {
    return (
      user.name.toLowerCase().includes(name.toLowerCase()) ||
      user.surname.toLowerCase().includes(name.toLowerCase())
    );
  });
  const handleChange = (event) => {
    var isChecked = event.target.checked;
    var item = event.target.value;
    setChecked((prevState) => prevState.set(item, isChecked));
  }
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Grid item xs={12} md={12} lg={12}>
            <div className={classes.demo}>
              <List>
                {filteredUsers.map((user, i) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={user.imgUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name + " " + user.surname} />
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
          <h6 className="place-title mt-3">{details.name}</h6>
              </Col>
            </Row>
            <div className="users-time">
          
            </div>
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
                <div>
                  <Typography className={classes.instructions}>
                    Invitation sent!{" "}
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <Typography className={classes.instructions}>
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
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
}
