import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuoteFee } from '../model/quote-fee';
import { VehicleMake } from '../model/vehicle/vehicle-make';
import { VehicleType } from '../model/vehicle/vehicle-type';
import { VehicleSubtype } from '../model/vehicle/vehicle-subtype';
import { VehicleModel } from '../model/vehicle/vehicle-model';
import { Crane } from '../model/crane';
import { QuotationService } from '../service/quotation.service';
import { VehicleService } from '../service/vehicle.service';
import { QuoteRequest } from '../model/quote-request';
import { Vehicle } from '../model/vehicle/vehicle';
import { Quotation } from '../model/quotation';

@Component({
  selector: 'car-auction-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent implements OnInit {

  public quoteGroupForm: FormGroup;
  public quotationSaveGroupForm: FormGroup;
  public showQuoteFee = false;
  public quoteFee: QuoteFee;
  public vehicleMakes: VehicleMake[];
  public vehicleTypes: VehicleType[];
  public vehicleSubtypes: VehicleSubtype[];
  public vehicleModels: VehicleModel[];
  public cranes: Crane[];

  private quotationId: string;

  constructor(private formBuilder: FormBuilder,
    private quotationService: QuotationService,
    private vehicleService: VehicleService) {
  }

  public ngOnInit(): void {
    this.initializeForms();
    this.vehicleService.getAllVehicleSubtypes()
      .subscribe(vehicleSubtypes => {
        this.vehicleSubtypes = vehicleSubtypes;
      });
  }

  public onSubmit(): void {
    if (this.quoteGroupForm.valid) {
      const form = this.quoteGroupForm.value;
      this.getQuote(form);
    }
  }

  public clearQuotation(): void {
    this.showQuoteFee = false;
    this.quotationId = null;
    this.quoteGroupForm.reset();
  }

  public onVehicleSubtypeChanged(vehicleSubtype: VehicleSubtype) {
    if (vehicleSubtype) {
      this.quotationService.getAllCranes(vehicleSubtype.id)
        .subscribe(cranes => {
          this.cranes = cranes;
        });
    }
  }

  public onVehicleTypeChange(vehicleType: VehicleType): void {
    if (vehicleType) {
      this.vehicleService.getAllVehicleMakes(Number(vehicleType.id))
        .subscribe(vehicleMakes => {
          this.vehicleMakes = vehicleMakes;
        });
    }
  }

  public onVehicleMakeChange(vehicleMake: VehicleMake): void {
    if (vehicleMake) {
      const vehicleSubtype = this.quotationSaveGroupForm.value.vehicleSubtype;
      if (vehicleSubtype) {
        this.vehicleService.getAllVehicleModels(Number(vehicleMake.id), Number(vehicleSubtype.id))
          .subscribe(vehicleModels => {
            this.vehicleModels = vehicleModels;
          });
      }
    }
  }

  public onVehicleSubtypeChange(vehicleSubtype: VehicleSubtype): void {
    if (vehicleSubtype) {
      const vehicleMake = this.quotationSaveGroupForm.value.vehicleMake;
      if (vehicleMake) {
        this.vehicleService.getAllVehicleModels(vehicleMake.id, Number(vehicleSubtype.id))
          .subscribe(vehicleModels => {
            this.vehicleModels = vehicleModels;
          });
      }
    }
  }

  public saveQuotation(): void {
    const vehicle: Vehicle = new Vehicle(
      this.quotationSaveGroupForm.value.vehicleType,
      this.quotationSaveGroupForm.value.vehicleMake,
      this.quotationSaveGroupForm.value.vehicleSubtype,
      this.quotationSaveGroupForm.value.vehicleModel,
      this.quotationSaveGroupForm.value.vehicleYear
    );

    const auctionDate: Date = new Date(this.quotationSaveGroupForm.value.auctionDate);
    const time: string[] = this.quotationSaveGroupForm.value.auctionTime.split(':');
    auctionDate.setUTCHours(Number(time[0]));
    auctionDate.setUTCMinutes(Number(time[1]));

    const quotation: Quotation = new Quotation(this.quotationSaveGroupForm.value.auctioneerUrl, auctionDate, this.quoteFee, vehicle);
    if (this.quotationId) {
      quotation.id = this.quotationId;
    }

    this.quotationService.saveQuotation(quotation).subscribe(quotationId => this.quotationId = quotationId);
  }

  public loadVehicleTypes(): void {
    this.vehicleService.getAllVehicleTypes()
      .subscribe(vehicleTypes => {
        this.vehicleTypes = vehicleTypes;
      });
  }

  private getQuote(form): void {
    const quoteRequest: QuoteRequest = new QuoteRequest(form.price, form.vehicleSubtype.id, form.craneFromCity.id);
    this.quotationService.getQuotation(quoteRequest)
      .subscribe(quoteFee => {
        this.quoteFee = quoteFee;
        this.showQuoteFee = true;
      });
  }

  private initializeForms(): void {
    this.quoteGroupForm = this.formBuilder.group({
      price: ['', Validators.required],
      vehicleSubtype: [null, Validators.required],
      craneFromCity: [null, Validators.required]
    });

    this.quotationSaveGroupForm = this.formBuilder.group({
      vehicleType: [null, Validators.required],
      vehicleMake: [null, Validators.required],
      vehicleSubtype: [null, Validators.required],
      vehicleModel: [null, Validators.required],
      vehicleYear: ['', Validators.required],
      auctionDate: ['', Validators.required],
      auctionTime: ['', Validators.required],
      auctioneerUrl: ['', Validators.required]
    });
  }

}
