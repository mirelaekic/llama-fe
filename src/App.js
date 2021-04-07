import React from "react";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import TestSidebar from "./components/TestSidebar/TestSidebar";
import HomeNav from "./components/HomeNav/HomeNav";
import Explore from "./Pages/Explore/Explore";
import history from "./history"

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <div className="App">
             <HomeNav />
          <header className="App-header">
            <TestSidebar />
            <Route path="/" exact component={Home} />
            <Route path="/chat" component={Chat} />
            <Route
              path="/profile/:id"
              render={(props) => <Profile {...props} />}
            />
            <Route path="/explore" component={Explore} />
          </header>
        </div>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
