import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './../main/login.component';
import { SignInComponent } from './../sign-in/sign-in.component';
import { LoginRoutingModule } from './login-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from '../../oauth/interceptor/authorization.interceptor';
import { AngularMaterialModule } from '../../angular-material/module/angular-material.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignInComponent
  ],
  imports: [
    AngularMaterialModule,
    LoginRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  }],
  exports: [LoginComponent]
})
export class LoginModule {

}
