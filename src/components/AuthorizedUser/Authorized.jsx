import React from 'react'
import { BrowserRouter as  Redirect, Route, Switch } from "react-router-dom";
import BottomBar from "../BottomBar/BottomBar";
import Home from "../../Pages/Home/Home";
import Chat from "../../Pages/Chat/Chat";

export default function Authorized() {
    return (
        <Switch>
            
            <Route path="/" exact component={Home} />
            <Route path="/chat" component={Chat} />
        </Switch>
    )
}
