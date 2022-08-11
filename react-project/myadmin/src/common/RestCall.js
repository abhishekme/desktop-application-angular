//Declare all asynchronous calling

import axios from "axios";
import environment from "./Environment";

/***************************************
 * @Method: Login Submit
 * @param:  
 * @data:       PostData(email, password)
 * @headers:    Request headers 
 * 
 ***************************************/
export const requestLogin = (postData, headers) =>{
    let url = environment.API_END + environment.METHOD_END.LOGIN;
    return axios.post(url, postData, headers);
}

export const userList = (params, token) =>{
    let url = environment.API_END + environment.METHOD_END.USER;
    const urlP = new URL(url);
    urlP.search = new URLSearchParams(params);
    return axios.get(urlP.href , { headers: {"authorization" : `Bearer ${token}`} })
}