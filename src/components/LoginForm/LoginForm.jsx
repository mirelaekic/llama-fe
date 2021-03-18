import React, { useState } from "react";
import "../styles.css";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/Actions/user";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Button } from "@material-ui/core";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  login:{
    background: 'linear-gradient(45deg, #AFEBD8 30%, #7DDBF6 90%)',
    border: 0,
    borderRadius: 25,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.15)',
    color: 'white',
    marginTop:"2rem",
    height: 40,
    padding: '0 80px',
    fontSize:"0.7rem"
  }
}));
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
  };
  const classes = useStyles();
  return (
    <div>
    
      <form className="login-form mt-4">
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">E-mail</InputLabel>
          <Input
            required
            id="username"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
          <Input
            type="password"
            required
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
      <Button onClick={handleSubmit} className={classes.login}>LOGIN</Button>
    </div>
  );
}
