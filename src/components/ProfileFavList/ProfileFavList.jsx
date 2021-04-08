import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinglePlaceDetails, removeFavPlace,
} from "../../store/Actions/explore";
import { IconButton } from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: "#F6F4F2",
  },
  mobileStepper: {
      background: "#F6F4F2"
  },
  img: {
    height: 455,
    maxWidth: 800,
    overflow: "hidden",
    display: "block",
    width: "100%",
  },
}));

export default function ProfileFavList() {
  const classes = useStyles();
  const theme = useTheme();
  const favourites = useSelector((state) => state.explore.favourite);
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = favourites.length;
  const dispatch = useDispatch();

  const details = useSelector((state) => state.explore.singleResult.result);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const removeFromFav = (id) => {
    dispatch(removeFavPlace(id));
  };
  useEffect(() => {
    dispatch(
      getSinglePlaceDetails(favourites ? favourites[activeStep].placeId : null)
    );
  }, [activeStep]);

  return favourites ? (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{details ? details.name : null}
        <IconButton onClick={() => removeFromFav(details.place_id)}><StarIcon /></IconButton></Typography>
      </Paper>
       <img className={classes.img} src={favourites ? favourites[activeStep].photoRef : ""} /> 
      <MobileStepper
      className={classes.mobileStepper}
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  ) : (
      <h6>Check out the some places and add them to your list</h6>
  );
}
