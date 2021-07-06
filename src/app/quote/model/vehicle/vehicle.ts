import { VehicleType } from './vehicle-type';
import { VehicleMake } from './vehicle-make';
import { VehicleSubtype } from './vehicle-subtype';
import { VehicleModel } from './vehicle-model';

export class Vehicle {

  public type: VehicleType;
  public make: VehicleMake;
  public subtype: VehicleSubtype;
  public model: VehicleModel;
  public year: number;

  constructor(type: VehicleType,
    make: VehicleMake,
    subtype: VehicleSubtype,
    model: VehicleModel,
    year: number) {
    this.type = type;
    this.make = make;
    this.subtype = subtype;
    this.model = model;
    this.year = year;
  }

}
