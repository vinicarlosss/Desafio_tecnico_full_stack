import { GetRidesResponse } from './../../Controller/Ride/response/GetRidesResponse';
import { Driver } from "../../Models/Driver/Driver";
import { Ride } from "../../Models/Ride/Ride";
import DriverRepository from "../../Repository/Driver/DriverRepository";
import RideRepository from "../../Repository/Ride/RideRepository";
import { GetRidesValidator } from "../../Validator/Ride/GetRidesValidator";

export class GetRidesService {
  private rideRepository: RideRepository;
  private driverRepository: DriverRepository;
  private getRidesValidator: GetRidesValidator;

  constructor() {
    this.rideRepository = new RideRepository();
    this.driverRepository = new DriverRepository();
    this.getRidesValidator = new GetRidesValidator();
  }

  public async getRides(requestInfo: { customer_id: string; driver_id?: number }) : Promise<GetRidesResponse>{
    
    const {customer_id, driver_id } = requestInfo;
    let driver: Driver | null = null;
    let withDriverId:boolean = false;
    if(driver_id){
        withDriverId = true;
        driver = await this.driverRepository.getById(driver_id);
    }
    this.getRidesValidator.validate(customer_id, driver, withDriverId);
    const rides: Ride[] = withDriverId ? await this.rideRepository.findAllByCustomerIdAndDriverID(customer_id, driver_id):await this.rideRepository.findAllByCustomerId(customer_id);
    const result : GetRidesResponse = {
        customer_id,
        rides: rides
    }
    return result;
  }
}
