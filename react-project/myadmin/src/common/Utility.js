import React, { useState }  from 'react';

//Check Auth Token
export const isLoggedIn = () => {
    let token = localStorage.getItem("token");
    if(token != '' && token != undefined && token != null){
        return true;
    }
    return false;
}