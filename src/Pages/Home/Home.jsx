import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../store/Actions/user";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
export default function Home() {
  const dispatch = useDispatch();

const handleLogout = (e) => {
    e.preventDefault()
     dispatch(logoutAction())
  }
  return (
    <div>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}
