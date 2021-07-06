import { Component, OnInit } from '@angular/core';
import { Quotation } from '../model/quotation';
import { QuotationService } from '../service/quotation.service';

@Component({
  selector: 'car-auction-stored-quotation-list',
  templateUrl: './stored-quotation-list.component.html',
  styleUrls: ['./stored-quotation-list.component.css']
})
export class StoredQuotationListComponent {

  public quotations: Quotation[];
  public showQuotations = false;

  constructor(private _quotationService: QuotationService) {
    this._quotationService.getAllQuotations().subscribe(quotations => {
      this.quotations = quotations;
      this.showQuotations = quotations.length > 0 ? true : false;
    });
  }

  private delete(id: string): void {
    const index: number = this.quotations.indexOf(this.quotations.find(quotation => quotation.id === id));
    this.quotations.splice(index, 1);
    this._quotationService.deleteQuotations(id);
  }

}
