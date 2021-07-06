import { Vehicle } from './vehicle/vehicle';
import { QuoteFee } from './quote-fee';

export class Quotation {

  public id: string;
  public auctioneerUrl: string;
  public auctionDate: Date;
  public quoteFee: QuoteFee;
  public vehicle: Vehicle;

  constructor(auctioneerUrl: string, auctionDate: Date, quoteFee: QuoteFee, vehicle: Vehicle) {
    this.auctioneerUrl = auctioneerUrl;
    this.auctionDate = auctionDate;
    this.quoteFee = quoteFee;
    this.vehicle = vehicle;
  }

}
