import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../services/constant';
import { UtilFunctionsService } from '../../../services/util_functions';
import { ApiService } from '../../../services/api_service';
import { observable, Observable } from 'rxjs';
import { TestCategory} from '../../../model/testCategory';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-test-Category',
  templateUrl: './test-category.component.html',
  styleUrls: ['./test-category.component.scss'],
  providers:[Constants, ApiService, UtilFunctionsService] 
})
export class TestCategoryComponent {

  categoryData: any       = [];
  testCategoryModel: any  = [];
  totalCategory: number   = 0;
  pageNo: number          = 1;
  pageLimit: number       = this._constant.listLIMIT;
  loading: boolean        = false;
  crudFlag: string        = '';
  crudURL: string         = '';
  crudMethod: string      = '';
  srchFlag: boolean       = false;
  srchInput: string       = '';
  options: any;
  selCategory: any        = '';
  typeReq: string         = 'category';
  selStatus: any          = [];
  utilFunct: UtilFunctionsService;
  
  constructor(public _constant: Constants, private _spinner: NgxSpinnerService, public _utilFunc: UtilFunctionsService, 
    private _apiServ: ApiService, private _toaster: ToastrService) { 
      this.testCategoryModel = new TestCategory();
      this.utilFunct = new UtilFunctionsService();
  }

  selectStatus(option: any){

  }

  selectCategory(option: any){
    console.log("@select: ", option.value);
    if(option.value){
      let getSourceURL: string = this._constant.API_END.categoryByShortName + '?short_name='+ option.value;
      console.log("@Category Updated 1: ", getSourceURL);
      this._apiServ.restCall('GET',getSourceURL)?.subscribe(item => {
        console.log(item, " === @@@Category data:");
        if(item){
          this.testCategoryModel  = item.data;
          this.categoryData       = [item.data];
        }
      });
    }
  }

  filterOptions(filter: any){    
    let op: string = filter.target.value.toString();
    console.log("@value: ", filter, " :: ", op, " :: ", this.options);
    let getSourceURL: string = this._constant.API_END.categoryByShortName + '?short_name='+ op;
    console.log("@Get URL: ", getSourceURL);
    this._apiServ.restCall('GET',getSourceURL)?.subscribe(item => {
      console.log(item, " === Category data:");
      if(item){
        this.options      = (item.data);
        this.selCategory  = '';
      }
    });   
  }

  getCategory(param: string = 'one'){
    let getSourceURL: string = this._constant.API_END.categoryRestAPI;
    getSourceURL  += '?op='+param.toString();
    this._apiServ.restCall('GET',getSourceURL)?.subscribe(rec =>{  
      this.categoryData   = [rec.data];
      this.testCategoryModel  = rec.data;
      this.totalCategory  = rec.totalCount;
      // this.options = new TestMaster();
      this.options = this.testCategoryModel;
      console.log("@Category: ", this.categoryData, " :: ", this.testCategoryModel );
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
    this.getCategory();
    //Add Status value
    this.selStatus.push({name: 'Active', value:1})
    this.selStatus.push({name: 'InActive', value:0})
    this.testCategoryModel.test_cat_status = '';
  }

  isValid(): boolean{
    //!this._utilFunc.inputValidation('blank',this.testCategoryModel.Categoryname) ||
    if(!this._utilFunc.inputValidation('blank',this.testCategoryModel.test_cat_name) ||
        !this._utilFunc.inputValidation('blank',this.testCategoryModel.test_cat_short_name) || 
        !this._utilFunc.inputValidation('blank',this.testCategoryModel.test_cat_status)){
        return false;
    }else{
      return true;
    }  
  }

  //Category Save
  saveCategory = async() =>{
    if(this.crudFlag === '') {
      this._toaster.warning("Please click on Mode", "Category Manage",this._constant.toasterOptions);
      return;
    }
    if(this.isValid()){
      this.crudURL = (this.crudFlag == 'ADD') ? this._constant.API_END.categoryRestAPI : this._constant.API_END.categoryRestAPI + "/?id=" + this.testCategoryModel.id;
      console.log("@Post Data: ", this.testCategoryModel);
      let postMode: any = {METHOD: (this.crudFlag == 'ADD') ? 'POST' : 'PUT', MODEL: this.testCategoryModel}
      let postData: any = this._constant.modelPropByMode = postMode;
      console.log(postData.MODEL, " == ", this.crudURL," :: ", postMode.METHOD);
      //this._spinner.show();
      this._apiServ.restCall(postMode.METHOD,this.crudURL, postData.MODEL)?.subscribe(
            async(data)  => {
                    const response = data;
                    if (response !== undefined && response.status) {
                      this.testCategoryModel = response.record;
                      if(this.crudFlag === 'EDIT'){
                        let getSourceURL: string = this._constant.API_END.CategoryByID + '?id='+ postData.MODEL.id;
                        console.log("@Category Updated 1: ", getSourceURL, " :: ", postData);
                        this._apiServ.restCall('GET',getSourceURL, postData.MODEL)?.subscribe(item => {
                          console.log(item, " === Category data:");
                          if(item){
                            this.testCategoryModel = item.data;
                          }
                        });                        
                      }
                      this.crudFlag = 'EDIT';
                      console.log(">>>Category created: ", response, " :: ", this.testCategoryModel);                      
                      this._toaster.success(response.message, "Category Manage",this._constant.toasterOptions)
                    }
                    if (!response.status) {
                        this._toaster.error(response.message, "Category Manage",this._constant.toasterOptions)
                    }
      },
      error =>{
        this._toaster.error("Exception Error, Contact Vendor for further Assistance.", "Category Manage",this._constant.toasterOptions)        
      }      
      );
    }else{
      this._toaster.error('Please check your entry properly', "Validation Error!",this._constant.toasterOptions)
    }
  }

  //Search Category
  searchCategory(){
    if(this.srchFlag) return;
    this.crudFlag = '';
    this.selCategory  = '';
    this.srchFlag = true;
    this.getCategory('all');
  }

  //New Add Category
  newCategory(){
    if(this.srchFlag) this.srchFlag  = false
    this.crudFlag = 'ADD';
    this._constant.setObjectPropEmpty = this.testCategoryModel;
  }

  //New Add Category
  updateCategory(){
    if(this.crudFlag === 'ADD') return;
    this.crudFlag = 'EDIT';
  }

  //Delete Category
  deleteCategory(){
    if(typeof this.testCategoryModel == 'object' && this._utilFunc.isEmptyObjectValue(this.testCategoryModel)){
      this._toaster.error('Select Record to be delete!', "System Error!",this._constant.toasterOptions)
      return;
    }
        if(confirm("Are you sure to delete selected Category?")) {
          let deletedId: number  = this.testCategoryModel.id;
          let deleteURL: string   = this._constant.API_END.categoryRestAPI + "/?id=" + this.testCategoryModel.id;
          if(this.totalCategory <= 1 && this.testCategoryModel.id != ''){
            this._toaster.warning("At least one record required!", "Category Manage",this._constant.toasterOptions);
            return false;
          }
          if(this.srchFlag){
            this.selCategory  = '';
            this.srchInput = '';
              if(this.options.length == 1){
                this.options = null;
                this.testCategoryModel = [];
              }else{
                let index = this.options.map((x: any) => {
                  return x.Id;
                }).indexOf(deletedId);
                this.options.splice(index, 1);
                //this.testCategoryModel = [];
              }
          }
          this._apiServ.restCall('DELETE', deleteURL)?.subscribe(
            (data)  => {
              if(typeof data === 'object' && data.status){      
                if(!this.srchFlag){
                  this.getCategory();
                }
                this._toaster.success(data.message, "Category Manage",this._constant.toasterOptions)
              }
            });
        }else{
          return false;
        }
  }

}


