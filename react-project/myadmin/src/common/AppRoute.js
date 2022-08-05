import React from "react";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import UserCrud from "../components/Dashboard/UserManage/UserCrud";
import UserList from "../components/Dashboard/UserManage/UserList";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
  import PublicRoute from "./PublicRoute";
  import PrivateRoute from "./PrivateRoute";

const AppRoute = () =>{
return(
<Router>
<div>
    <Switch>
        <Route exact path="/">
        <Redirect to = "/Login"/>
        </Route>
        <PublicRoute  restricted={true} component={Login} path = "/Login" exact />
        <PrivateRoute  component={Dashboard} path = "/Dashboard" exact />
        <PrivateRoute  component={UserList} path = "/UserList" exact />

        {/* <Route exact path="/">
        <Login />
        </Route>
        <Route path="/user">
        <UserList />
        </Route>
        <Route path="/dashboard">
        <Dashboard />
        </Route> */}
    </Switch>
</div>
</Router>
);

}

;export default AppRoute;