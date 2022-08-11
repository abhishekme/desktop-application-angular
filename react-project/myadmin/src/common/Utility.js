import React, { useState }  from 'react';

//Check Auth Token
export const isLoggedIn = () => {
    let token = localStorage.getItem("token");
    if(token != '' && token != undefined && token != null){
        return true;
    }
    return false;
}

export const titleCase = (str) => {
    str.toLowerCase();
    var strAr = str.split("_");
    for(var i=0;i<strAr.length;i++)
    {
        strAr[i] = strAr[i].charAt(0).toUpperCase() + strAr[i].substring(1).toLowerCase();     
    }
    str = strAr.join(" ");
    return str;
}

export const isEmtyObject = (obj) => {
        for(let k in obj){
            if(obj.hasOwnProperty(k)){
                return false
            }
        }
    return true;
}

//Build List Record Allow Fields
export const allowFields = {

    userList:{
        show : {
            first_name: true,
            last_name: true,
            email: true,
            mobile: true,
            address: false
        },
        filter:{
            //Do the needful
        }        
    }
}