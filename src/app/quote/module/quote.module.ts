import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularMaterialModule } from '../../angular-material/module/angular-material.module';
import { QuoteComponent } from '../main/quote.component';
import { QuoteFormComponent } from '../quote-form/quote-form.component';
import { StoredQuotationListComponent } from '../stored-quotation-list/stored-quotation-list.component';
import { OnlyNumberDirective } from '../../directives/only-number.directive';
import { TimePickerDirective } from '../../directives/time-picker.directive';
import { QuoteRoutingModule } from './quote-routing.module';
import { QuotationService } from '../service/quotation.service';
import { VehicleService } from '../service/vehicle.service';

@NgModule({
  declarations: [
    QuoteComponent,
    QuoteFormComponent,
    StoredQuotationListComponent,
    OnlyNumberDirective,
    TimePickerDirective
  ],
  imports: [
    QuoteRoutingModule,
    NgSelectModule,
    AngularMaterialModule
  ],
  providers: [QuotationService, VehicleService]
})
export class QuoteModule {

}
