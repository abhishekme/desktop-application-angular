import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLoggedIn} from './Utility';

const PrivateRoute  =  ({component: Component, ...rest}) => {
    const[loggedIn, setLoggedIn] = React.useState(isLoggedIn());
    return (
        <Route {...rest} render = { props => (
            loggedIn ? 
                <Component {...props}  />
            : <Redirect to = "/Login"/>
        )} />
    )
} 

export default PrivateRoute;
