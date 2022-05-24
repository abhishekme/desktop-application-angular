import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from './constant';

@Injectable()
export class UtilFunctionsService{
    
    
    constructor(private _constant?: Constants){}

    //Validation Gateway
    public inputValidation = (type: any, value: any) => {
        const spaceRegEx: any       = /\S+/;
        const nameOnlyRegEx: any    = /[^a-zA-Z]/s;
        const userNameRegEx: any    = /[^a-zA-Z_.0-9]/g;
        const numberOnlyRegEx: any  = /[^0-9.]/g;
        const emailRegEx: any       = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        switch(type){

            case 'email': {
                console.log("@Check email: ",type, " :: ", value, " == ", emailRegEx.test(value));
                return emailRegEx.test(value);                
            }
            break;
            case 'blank': {
                console.log("@Check space: ",type, " :: ", value, " == ", spaceRegEx.test(value));
                return spaceRegEx.test(value);
            }
            break;
            case 'nameOnly': {
                console.log("@Check Nameonly: ",type, " :: ", value, " == ", nameOnlyRegEx.test(value));
                return nameOnlyRegEx.test(value);
            }
            break;

        }

    }
}

