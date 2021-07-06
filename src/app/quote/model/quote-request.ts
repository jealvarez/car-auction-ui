
export class QuoteRequest {

  public price: number;
  public vehicleTypeId: number;
  public craneCityId: number;

  constructor(price: number, vehicleTypeId: number, craneCityId: number) {
    this.price = price;
    this.vehicleTypeId = vehicleTypeId;
    this.craneCityId = craneCityId;
  }

}
