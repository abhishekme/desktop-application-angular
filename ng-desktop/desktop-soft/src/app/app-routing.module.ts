import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserManageComponent } from './dashboard/user-manage/user-manage.component';
import { TestMasterComponent } from './dashboard/test-section/test-master/test-master.component';
import { TestCategoryComponent } from './dashboard/test-section/test-category/test-category.component';

//
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'user-manage', component: UserManageComponent },
  { path: 'test-master', component: TestMasterComponent },
  { path: 'test-category', component: TestCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
