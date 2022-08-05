import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLoggedIn} from './Utility';


const PublicRoute  =  ({component: Component, restricted, ...rest}) => {

    const[loggedIn, setLoggedIn] = React.useState(isLoggedIn());

    return (
        <Route {...rest} render = { props => (
            loggedIn && restricted ?                 
                <Redirect to = "/Dashboard"/>
            :   <Component {...props}  />
        )} />           

    )
} 

export default PublicRoute;
