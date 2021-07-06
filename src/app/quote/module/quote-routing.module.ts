import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { QuoteFormComponent } from '../quote-form/quote-form.component';
import { StoredQuotationListComponent } from '../stored-quotation-list/stored-quotation-list.component';
import { AuthorizationGuard } from '../../oauth/service/authorization-guard.service';

const QUOTE_ROUTES: Routes = [
  {
    path: 'quotes', component: HomeComponent, children: [
      { path: '', component: QuoteFormComponent, canActivate: [AuthorizationGuard] },
      { path: 'stored', component: StoredQuotationListComponent, canActivate: [AuthorizationGuard] }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(QUOTE_ROUTES)
  ],
  exports: [RouterModule]
})
export class QuoteRoutingModule {

}
