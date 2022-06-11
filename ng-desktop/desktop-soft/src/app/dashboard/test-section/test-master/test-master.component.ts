
import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../services/constant';
import { UtilFunctionsService } from '../../../services/util_functions';
import { ApiService } from '../../../services/api_service';
import { observable, Observable } from 'rxjs';
import { TestMaster} from '../../../model/testMaster';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-test-master',
  templateUrl: './test-master.component.html',
  styleUrls: ['./test-master.component.scss'],
  providers:[Constants, ApiService, UtilFunctionsService] 
})
export class TestMasterComponent {

  userData: any       = [];
  testMasterModel: any      = [];
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
      this.testMasterModel = new TestMaster();
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
          this.testMasterModel = item.data;
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
      this.testMasterModel  = rec.data;
      this.totalUser  = rec.totalCount;
      // this.options = new TestMaster();
      this.options = this.testMasterModel;
      console.log("@User: ", this.userData, " :: ", this.testMasterModel );
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
    //!this._utilFunc.inputValidation('blank',this.testMasterModel.username) ||
    if(!this._utilFunc.inputValidation('blank',this.testMasterModel.email) ||
        !this._utilFunc.inputValidation('blank',this.testMasterModel.first_name) || 
        !this._utilFunc.inputValidation('blank',this.testMasterModel.mobile) || 
        !this._utilFunc.inputValidation('blank',this.testMasterModel.last_name)){
        return false;
    }else if(!this._utilFunc.inputValidation('email',this.testMasterModel.email) || this.testMasterModel.mobile.length < 10){
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
      this.crudURL = (this.crudFlag == 'ADD') ? this._constant.API_END.userRestAPI : this._constant.API_END.userRestAPI + "/?id=" + this.testMasterModel.id;
      console.log("@Post Data: ", this.testMasterModel);
      let postMode: any = {METHOD: (this.crudFlag == 'ADD') ? 'POST' : 'PUT', MODEL: this.testMasterModel}
      let postData: any = this._constant.modelPropByMode = postMode;
      console.log(postData.MODEL, " == ", this.crudURL," :: ", postMode.METHOD);
      //this._spinner.show();
      this._apiServ.restCall(postMode.METHOD,this.crudURL, postData.MODEL)?.subscribe(
            async(data)  => {
                    const response = data;
                    if (response !== undefined && response.status) {
                      this.testMasterModel = response.record;
                      if(this.crudFlag === 'EDIT'){
                        let getSourceURL: string = this._constant.API_END.userByID + '?id='+ postData.MODEL.id;
                        console.log("@User Updated 1: ", getSourceURL, " :: ", postData);
                        this._apiServ.restCall('GET',getSourceURL, postData.MODEL)?.subscribe(item => {
                          console.log(item, " === User data:");
                          if(item){
                            this.testMasterModel = item.data;
                          }
                        });                        
                      }
                      this.crudFlag = 'EDIT';
                      console.log(">>>User created: ", response, " :: ", this.testMasterModel);                      
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
    this._constant.setObjectPropEmpty = this.testMasterModel;
  }

  //New Add user
  updateUser(){
    if(this.crudFlag === 'ADD') return;
    this.crudFlag = 'EDIT';
  }

  //Delete User
  deleteUser(){
    if(typeof this.testMasterModel == 'object' && this._utilFunc.isEmptyObjectValue(this.testMasterModel)){
      this._toaster.error('Select Record to be delete!', "System Error!",this._constant.toasterOptions)
      return;
    }
        if(confirm("Are you sure to delete selected user?")) {
          let deletedId: number  = this.testMasterModel.id;
          let deleteURL: string   = this._constant.API_END.userRestAPI + "/?id=" + this.testMasterModel.id;
          if(this.totalUser <= 1 && this.testMasterModel.id != ''){
            this._toaster.warning("At least one record required!", "User Manage",this._constant.toasterOptions);
            return false;
          }
          if(this.srchFlag){
            this.selUser  = '';
            this.srchInput = '';
              if(this.options.length == 1){
                this.options = null;
                this.testMasterModel = [];
              }else{
                let index = this.options.map((x: any) => {
                  return x.Id;
                }).indexOf(deletedId);
                this.options.splice(index, 1);
                //this.testMasterModel = [];
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

