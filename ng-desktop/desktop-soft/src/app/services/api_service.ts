import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders  } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Constants } from './constant';
import { User} from '../model/user'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class ApiService{
    
    constructor(public http: HttpClient, private _toaster: ToastrService, private _constant: Constants){}

    getLoginToken():string{
        let getToken:any 		=	'';
        if(sessionStorage.getItem('loginToken') != undefined){
            let getTokenData 	=	(sessionStorage.getItem('loginToken'));
            getToken 		    =	getTokenData;
        }
        return getToken;
    }

    //Application Headers
    getHeaders(){
        let header = {
          headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
        }
        return header;
    }

    //Authenticate Headers
    getAuthHeaders(){
        let header = {
          headers: new HttpHeaders()
            .set('authorization',  `Bearer ${this.getLoginToken()}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
        return header;
    }

    //Login API
    postLogin(apiURL: string , lognData: any) : Observable<any>{
        return this.http.post<any>(apiURL, lognData, this.getHeaders())
        .pipe(
        retry(1),
        catchError(this.handleError)
        )
    }

    postCreate(apiURL: string , lognData: any) : Observable<any>{
        return this.http.post<any>(apiURL, lognData, this.getHeaders())
        .pipe(
        retry(1),
        catchError(this.handleError)
        )
    }
    
    //Others Method Base Rest API Call
    restCall(method: any, apiURL: string , apiData?: any) : Observable<any>{
        let ob : any = new Observable();       
        
        switch(method){
            case 'GET':
                return this.http.get<any>(apiURL, this.getAuthHeaders())
                .pipe(
                retry(1),
                catchError(this.handleError)
                )            
            break;

            case 'POST':
                console.log("@calling POST....");
                return this.http.post<any>(apiURL, apiData, this.getHeaders())
                .pipe(
                retry(1),
                catchError(this.handleError)
                )        
            break;

            case 'PUT':
                console.log("@calling PUT UPDATE....");
                return this.http.put<any>(apiURL, apiData, this.getHeaders())
                .pipe(
                retry(1),
                catchError(this.handleError)
                )       
            break;

            case 'DELETE':
                console.log("@calling PUT DELETE....");
                return this.http.delete<any>(apiURL, this.getHeaders())
                .pipe(
                retry(1),
                catchError(this.handleError)
                )
            break;
        }
        return ob;
    }

    //Handling API Error
    //Error handling 
    handleError(error: any) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
        } else {
        // Get server-side error
        //errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
        errorMessage = `Server Error, Please check if Server is running :: Server Sending Error Message: ${error.message}`
        }
        //window.alert(errorMessage);
        //this._toaster.warning(errorMessage, "System Error",this._constant.toasterOptions);
        return throwError(errorMessage);
    }
}

