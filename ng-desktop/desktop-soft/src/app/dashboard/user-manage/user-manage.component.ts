import { Component, OnInit } from '@angular/core';
import { Constants } from '../../services/constant';
import { UtilFunctionsService } from '../../services/util_functions';
import { ApiService } from '../../services/api_service';
import { observable, Observable } from 'rxjs'
import { User} from '../../model/user';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
  providers:[Constants, ApiService, UtilFunctionsService] 
})
export class UserManageComponent {

  userData: any       = [];
  userModel: any      = [];
  totalUser: number   = 0;
  pageNo: number      = 1;
  pageLimit: number   = this._constant.listLIMIT;
  loading: boolean    = false;
  crudFlag: string    = '';
  crudURL: string     = '';
  crudMethod: string  = '';
  srchFlag: boolean   = false;
  srchInput: string   = '';
  options: any;
  selUser: any        = '';
  typeReq: string     = 'user';
  utilFunct: UtilFunctionsService;
  
  constructor(public _constant: Constants, private _spinner: NgxSpinnerService, public _utilFunc: UtilFunctionsService, 
    private _apiServ: ApiService, private _toaster: ToastrService) { 
      this.userModel = new User();
      this.utilFunct = new UtilFunctionsService();
  }

  

  selectUser(option: any){
    console.log("@select: ", option.value);
    if(option.value){
      let getSourceURL: string = this._constant.API_END.userByID + '?id='+ option.value;
      console.log("@User Updated 1: ", getSourceURL);
      this._apiServ.restCall('GET',getSourceURL)?.subscribe(item => {
        console.log(item, " === User data:");
        if(item){
          this.userModel = item.data;
          this.userData   = [item.data];
        }
      });
    }
  }

  filterOptions(filter: any){    
    let op: string = filter.target.value.toString();
    console.log("@value: ", filter, " :: ", op, " :: ", this.options);
    let getSourceURL: string = this._constant.API_END.userByMOB + '?mob='+ op;
    console.log("@Get URL: ", getSourceURL);
    this._apiServ.restCall('GET',getSourceURL)?.subscribe(item => {
      console.log(item, " === User data:");
      if(item){
        this.options = (item.data);
        this.selUser = '';
      }
    });   
  }

  getUser(param: string = 'one'){
    let getSourceURL: string = this._constant.API_END.userRestAPI;
    getSourceURL  += '?op='+param.toString();
    this._apiServ.restCall('GET',getSourceURL)?.subscribe(rec =>{  
      this.userData   = [rec.data];
      this.userModel  = rec.data;
      this.totalUser  = rec.totalCount;
      this.options = new User();
      console.log("@User: ", this.userData, " :: ", this.userModel );
    },
    error =>{
      console.log("@API Error...");
    },
    () =>{
      this.loading  = true;
    }
    )    
  }

  ngOnInit(): void {
    this.getUser();
  }

  isValid(): boolean{
    //!this._utilFunc.inputValidation('blank',this.userModel.username) ||
    if(!this._utilFunc.inputValidation('blank',this.userModel.email) ||
        !this._utilFunc.inputValidation('blank',this.userModel.first_name) || 
        !this._utilFunc.inputValidation('blank',this.userModel.mobile) || 
        !this._utilFunc.inputValidation('blank',this.userModel.last_name)){
        return false;
    }else if(!this._utilFunc.inputValidation('email',this.userModel.email) || this.userModel.mobile.length < 10){
      return false;
    }else{
      return true;
    }  
  }

  //User Save
  saveUser = async() =>{
    if(this.crudFlag === '') {
      this._toaster.warning("Please click on Mode", "User Manage",this._constant.toasterOptions);
      return;
    }
    if(this.isValid()){
      this.crudURL = (this.crudFlag == 'ADD') ? this._constant.API_END.userRestAPI : this._constant.API_END.userRestAPI + "/?id=" + this.userModel.id;
      console.log("@Post Data: ", this.userModel);
      let postMode: any = {METHOD: (this.crudFlag == 'ADD') ? 'POST' : 'PUT', MODEL: this.userModel}
      let postData: any = this._constant.modelPropByMode = postMode;
      console.log(postData.MODEL, " == ", this.crudURL," :: ", postMode.METHOD);
      //this._spinner.show();
      this._apiServ.restCall(postMode.METHOD,this.crudURL, postData.MODEL)?.subscribe(
            async(data)  => {
                    const response = data;
                    if (response !== undefined && response.status) {
                      this.userModel = response.record;
                      if(this.crudFlag === 'EDIT'){
                        let getSourceURL: string = this._constant.API_END.userByID + '?id='+ postData.MODEL.id;
                        console.log("@User Updated 1: ", getSourceURL, " :: ", postData);
                        this._apiServ.restCall('GET',getSourceURL, postData.MODEL)?.subscribe(item => {
                          console.log(item, " === User data:");
                          if(item){
                            this.userModel = item.data;
                          }
                        });                        
                      }
                      this.crudFlag = 'EDIT';
                      console.log(">>>User created: ", response, " :: ", this.userModel);                      
                      this._toaster.success(response.message, "User Manage",this._constant.toasterOptions)
                    }
                    if (!response.status) {
                        this._toaster.error(response.message, "User Manage",this._constant.toasterOptions)
                    }
      },
      error =>{
        this._toaster.error("Exception Error, Contact Vendor for further Assistance.", "User Manage",this._constant.toasterOptions)        
      }      
      );
    }else{
      this._toaster.error('Please check your entry properly', "Validation Error!",this._constant.toasterOptions)
    }
  }

  //Search User
  searchUser(){
    if(this.srchFlag) return;
    this.crudFlag = '';
    this.selUser  = '';
    this.srchFlag = true;
    this.getUser('all');
  }

  //New Add user
  newUser(){
    if(this.srchFlag) this.srchFlag  = false
    this.crudFlag = 'ADD';
    this._constant.setObjectPropEmpty = this.userModel;
  }

  //New Add user
  updateUser(){
    if(this.crudFlag === 'ADD') return;
    this.crudFlag = 'EDIT';
  }

  //Delete User
  deleteUser(){
    if(confirm("Are you sure to delete selected user?")) {
      let deletedId: number  = this.userModel.id;
      let deleteURL: string   = this._constant.API_END.userRestAPI + "/?id=" + this.userModel.id;
      if(this.totalUser <= 1 && this.userModel.id != ''){
        this._toaster.warning("At least one record required!", "User Manage",this._constant.toasterOptions);
        return false;
      }
      if(this.srchFlag){
        this.selUser  = '';
        this.srchInput = '';
          if(this.options.length == 1){
            this.options = null;
            this.userModel = [];
          }else{
            let index = this.options.map((x: any) => {
              return x.Id;
            }).indexOf(deletedId);
            this.options.splice(index, 1);
            this.userModel = [];
          }
      }
      this._apiServ.restCall('DELETE', deleteURL)?.subscribe(
        (data)  => {
          if(typeof data === 'object' && data.status){      
            if(!this.srchFlag){
              this.getUser();
            }
            this._toaster.success(data.message, "User Manage",this._constant.toasterOptions)
          }
        });
    }else{
      return false;
    }
  }

}
