import React, { useState } from "react";
import "../styles.css";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RegisterForm from "../RegisterForm/RegisterForm";
import llamaLogo8 from "../../icon/llamaLogo8.jpg";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from '@material-ui/core/CircularProgress';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  root: {
    marginTop: "3rem",
    marginBottom: "5rem",
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
  success: {
    fontWeight: 600,
    color: "green",
    marginTop: 12,
    marginBottom: 12,
    fontSize: "13px",
  },
  signup: {
    marginTop: 30,
    marginBottom: 15,
  },
});

function RegisterCard() {
  const [open, setOpen] = React.useState(true);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading)
  const notification = useSelector((state) => state.user.notification);
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Container>
      <Card className={classes.root}>
        <Row>
          <Col className="register-detail col" sm={12} md={6} lg={6}></Col>
          <Col className="col" xs={12} sm={12} md={6} lg={6}>
            <img className="login-logo" src={llamaLogo8} />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Adventure awaits you. <br /> Create your account here.
              </Typography>
              <Button className="google-button mt-2 mb-2">
                <img
                  className="google-login mr-1"
                  src="https://media-public.canva.com/uhAxM/MABr1suhAxM/2/s.svg"
                />{" "}
                Sign up with google
              </Button>
              <Typography className={classes.pos} color="textSecondary">
                OR CREATE ACCOUNT WITH EMAIL
              </Typography>
              {loading ? <CircularProgress /> : " " }
              {error ? (
                <Snackbar open={open} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error">
                    {error}
                  </Alert>
                </Snackbar>
              ) : ""}
              {notification ? (
                <Typography className={classes.success} color="textSecondary">
                  {notification}
                </Typography>
              ) : " "}
              <RegisterForm />
              <hr className="breakline-login" />
              <Typography className={classes.signup} color="textSecondary">
                Already have an account? <Link to="/login">Sign in here!</Link>
              </Typography>
            </CardContent>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
export default withRouter(RegisterCard);
