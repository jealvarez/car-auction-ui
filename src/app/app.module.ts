import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/module/login.module';
import { AuthorizationGuard } from './oauth/service/authorization-guard.service';
import { AuthorizationService } from './oauth/service/authorization.service';
import { QuoteModule } from './quote/module/quote.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    QuoteModule,
    LoginModule
  ],
  providers: [AuthorizationService, AuthorizationGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}
