import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../services/constant'
import { ApiService } from '../services/api_service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[Constants, ApiService]
})
export class LoginComponent implements OnInit {

  username: any = '';
  password: any = '';
  spaceRegEx    = /\s/;
  clickDiabled: boolean = false;
  constructor(private _toater: ToastrService, private _constant: Constants, private _apiServ: ApiService, 
    private router: Router,private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  isValid(): boolean{
    if(this.username === '' || this.spaceRegEx.test(this.username)){
        return false;
    }
    else if(this.password === '' || this.spaceRegEx.test(this.password)){
        return false;
    }else{
        return true; 
    }    
  }

  login(): boolean{
    this.clickDiabled  = true;
    if(this.isValid()){
        let postData: any = {
          login_name:   this.username,
          password:     this.password 
        }
        let loginURL: string = this._constant.API_END.loginAPI;
        this._spinner.show();
        this._apiServ.postLogin(loginURL,postData)
            .subscribe(
            data => {
                    const response = data;
                    if (response !== undefined && response.status) {
                        this.router.navigated = false;
                        // Check secure login token :: JWT
                        if (response.authToken !== undefined && response.authToken !== null) {
                            sessionStorage.setItem('loginToken', response.authToken);
                        }
                        setTimeout(()=>{
                          this._spinner.hide();
                          this._toater.success('Redirecting', "Success",this._constant.toasterOptions)
                            this.router.navigateByUrl('user-manage');
                        },500)
                    }
                    if (!response.status) {                        
                        this._toater.error(response.message, "Login Failed",this._constant.toasterOptions)
                        setTimeout(()=>{
                          this._spinner.hide();
                          this.clickDiabled = false;
                        }, this._constant.disableClicked)
                    }
      },
      error =>{
        setTimeout(()=>{
          this._spinner.hide();
          this.clickDiabled = false;
        }, this._constant.disableClicked)
      }      
      );
      return true;
    }else{      
      this._toater.error('Login Failed!', "Validation Error!",this._constant.toasterOptions)
      setTimeout(()=>{
        this._spinner.hide();
        this.clickDiabled = false;
      }, this._constant.disableClicked)
      return false;
    }      
  }
}
