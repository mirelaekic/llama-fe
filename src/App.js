import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile"
function App() {

  return (
    <Router>
      <Switch>
        <div className="App">
        <header className="App-header">
        <Route path="/" exact component={Home} />
        <Route path="/chat" component={Chat} />
        <Route path="/profile/:id" render={(props) => <Profile {...props} />} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        </header>
        </div>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
