import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import BottomBar from "./components/BottomBar/BottomBar";
import Home from "./Pages/Home/Home";
import Chat from "./Pages/Chat/Chat";
import Login from "./Pages/Login/Login";

function App() {
  const token = localStorage.getItem("accessToken")
  return (
    <Router>
      <Switch>
            
            <Route path="/" exact component={Home} />
            <Route path="/chat" component={Chat} />
          <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
