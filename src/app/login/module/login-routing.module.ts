import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './../main/login.component';
import { SignInComponent } from './../sign-in/sign-in.component';

const LOGIN_ROUTES: Routes = [
  {
    path: 'login', component: LoginComponent, children: [
      { path: '', component: SignInComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(LOGIN_ROUTES)
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule {

}
