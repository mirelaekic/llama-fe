import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../store/Actions/user";
import "../styles.css";
import LoginCard from "../../components/LoginCard/LoginCard";
import { Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
export default function Login() {
  return (
    <div className="login-page">
      <LoginCard />
    </div>
  );
}
