import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Crane } from '../model/crane';
import { QuoteFee } from '../model/quote-fee';
import { QuoteRequest } from '../model/quote-request';
import { Quotation } from '../model/quotation';

@Injectable()
export class QuotationService {

  readonly FEES_RESOURCE = `${environment.domain}/v1/fees`;
  readonly QUOTES_RESOURCE = `${environment.domain}/v1/quotations`;
  readonly TRANSPORTATIONS_RESOURCE = `${environment.domain}/v1/transportations`;

  constructor(private httpClient: HttpClient
  ) { }

  public getAllCranes(vehicleSubtypeId: number): Observable<Crane[]> {
    return this.httpClient.get<Crane[]>(this.TRANSPORTATIONS_RESOURCE + `/cranes?vehicleSubtypeId=${vehicleSubtypeId}`, { withCredentials: true });
  }

  public getQuotation(quoteRequest: QuoteRequest): Observable<QuoteFee> {
    return this.httpClient.post<QuoteFee>(this.FEES_RESOURCE, quoteRequest, { withCredentials: true });
  }

  public saveQuotation(quotation: Quotation): Observable<string> {
    return this.httpClient.post<string>(this.QUOTES_RESOURCE, quotation, { withCredentials: true });
  }

  public getAllQuotations(): Observable<Quotation[]> {
    return this.httpClient.get<Quotation[]>(this.QUOTES_RESOURCE, { withCredentials: true });
  }

  public deleteQuotations(id: string): void {
    this.httpClient.delete(this.QUOTES_RESOURCE + `/${id}`, { withCredentials: true }).subscribe();
  }

}
