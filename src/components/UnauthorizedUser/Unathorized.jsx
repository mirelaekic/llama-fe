import React from 'react'
import { BrowserRouter as  Redirect, Route, Switch } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import NotFound from "../../Pages/NotFound"
export default function Authorized() {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    )
}
