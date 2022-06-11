import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { UserComponent } from './dashboard/user/user.component';
import { UserManageComponent } from './dashboard/user-manage/user-manage.component';
import { MenuComponent } from './shared-comp/menu/menu.component';
import { PanelActionComponent } from './utilities/panel-action/panel-action.component';
import { LoadingComponent } from './utilities/loader/loading.component';
import {PrintPreviewComponent} from './dialog/print-preview/print-preview.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TestMasterComponent } from './dashboard/test-section/test-master/test-master.component';
import { TestCategoryComponent } from './dashboard/test-section/test-category/test-category.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    //UserComponent,
    UserManageComponent,
    MenuComponent,
    PanelActionComponent,
    LoadingComponent,
    PrintPreviewComponent,
    TestMasterComponent,
    TestCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    FlexLayoutModule,
    
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularMaterialModule,
    FormsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
