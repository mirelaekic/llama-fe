import React, { useState, useEffect } from "react";
import "../styles.css";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LoginForm from "../LoginForm/LoginForm";
import llamaLogo8 from "../../icon/llamaLogo8.jpg";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
    marginTop: "3rem",
    marginBottom: "7rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: "13px",
  },
  error: {
    fontWeight: 600,
    color: "red",
    marginTop: 12,
    marginBottom: 12,
    fontSize: "13px",
  },
  signup: {
    marginTop: 30,
    marginBottom: 15,
  },
});

function LoginCard() {
    
  const error = useSelector((state) => state.user.error);
  const [hour, setHour] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const date = new Date();
    const time = date.getHours();
    setHour(time);
  }, [setHour]);

  console.log(hour, "CURRENT HOUR");
  return (
    <Card className={classes.root}>
      <img className="login-logo" src={llamaLogo8} />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {hour < 12 ? "Good morning!" : "Good afternoon!"} Welcome back
        </Typography>
        <Button className="google-button mt-2 mb-2">
          <img
            className="google-login mr-1"
            src="https://media-public.canva.com/uhAxM/MABr1suhAxM/2/s.svg"
          />{" "}
          Sign in with google
        </Button>
        <Typography className={classes.pos} color="textSecondary">
          OR LOGIN WITH EMAIL
        </Typography>
        {error ? (
          <Typography className={classes.error} color="textSecondary">
            {error}
          </Typography>
        ) : (
          ""
        )}
        <LoginForm />
        <hr className="breakline-login" />
        <Typography className={classes.signup} color="textSecondary">
          Don't have an account? <Link to="/register">Sign up here!</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
export default withRouter(LoginCard);
