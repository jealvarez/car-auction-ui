import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { VehicleType } from '../model/vehicle/vehicle-type';
import { VehicleMake } from '../model/vehicle/vehicle-make';
import { VehicleSubtype } from '../model/vehicle/vehicle-subtype';
import { VehicleModel } from '../model/vehicle/vehicle-model';

@Injectable()
export class VehicleService {

  readonly VEHICLES_RESOURCE = `${environment.domain}/v1/vehicles`;

  constructor(private httpClient: HttpClient
  ) { }

  public getAllVehicleTypes(): Observable<VehicleType[]> {
    return this.httpClient.get<VehicleType[]>(this.VEHICLES_RESOURCE + '/types', { withCredentials: true });
  }

  public getAllVehicleMakes(vehicleTypeId: number): Observable<VehicleMake[]> {
    return this.httpClient.get<VehicleMake[]>(this.VEHICLES_RESOURCE + `/makes/${vehicleTypeId}`, { withCredentials: true });
  }

  public getAllVehicleSubtypes(): Observable<VehicleSubtype[]> {
    return this.httpClient.get<VehicleSubtype[]>(this.VEHICLES_RESOURCE + '/subtypes', { withCredentials: true });
  }

  public getAllVehicleModels(vehicleMakeId: number, vehicleSubtypeId: number): Observable<VehicleModel[]> {
    return this.httpClient.get<VehicleModel[]>(this.VEHICLES_RESOURCE + `/models?vehicleMakeId=${vehicleMakeId}&vehicleSubtypeId=${vehicleSubtypeId}`, { withCredentials: true });
  }

}
