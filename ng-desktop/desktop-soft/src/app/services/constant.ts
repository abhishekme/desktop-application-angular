//Project constants
import { Injectable } from '@angular/core';

@Injectable()
export class Constants{
    constructor(){}

    public API_END_URL: string     =   'http://localhost:8085/';
    public API_END: any = 
        {
            loginAPI:           this.API_END_URL +  'login',
            userRestAPI:        this.API_END_URL +  'user',
            userByID:           this.API_END_URL +  'userById',
            userByMOB:          this.API_END_URL +  'userByMob'            
        }

    //Static Constant Declaration
    public toasterOptions: any = {timeOut: 1500,progressBar: false,positionClass: 'toast-top-right'}
    public disableClicked: number = 1500;
    public listLIMIT: number = 1;

    get token(){        
        let getToken:any 		=	'';
        if(sessionStorage.getItem('loginToken') != undefined){
            let getTokenData 	=	(sessionStorage.getItem('loginToken'));
            getToken 		    =	getTokenData;
        }
        return getToken;
    }

    set setObjectPropEmpty(getObject: any){
        let setObject: any = getObject;
        if(setObject && typeof setObject == 'object'){
            for(var k in setObject){            
              if(setObject[k] != ''){
                setObject[k] = '';
              }
            }
        }
    }

    set modelPropByMode(dataMode: any){
        let getDataMode: any = dataMode;
        let getDataModel: any = dataMode.MODEL;
        let setObject: any;
        if(typeof getDataMode === 'object'){
            if(getDataMode.METHOD == 'POST'){
                delete getDataModel.id;
                delete getDataModel.password; delete getDataModel.user_avatar; 
                delete getDataModel.createdAt; delete getDataModel.updatedAt;
            }
            if(getDataMode.METHOD == 'PUT'){
                delete getDataModel.createdAt; delete getDataModel.updatedAt;
                delete getDataModel.password;
            }
            setObject = getDataModel;
        }
    }

    // public messageTimeout(){
    //     setTimeout(()=>{
    //          this.clickDiabled = false;
    //       }, this.disableClicked)
    // }

}