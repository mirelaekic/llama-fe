import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "./store/Actions/user";
import { isAuth } from "./utils/authenticate";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register/Register";
const Authorized = React.lazy(() =>
  import("./components/AuthorizedUser/Authorized")
);
const Unauthorized = React.lazy(() =>
  import("./components/UnauthorizedUser/Unathorized")
);

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/chat" component={Chat} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
