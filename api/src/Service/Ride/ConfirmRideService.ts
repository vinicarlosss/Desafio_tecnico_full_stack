import { ConfirmRideResponse } from "../../Controller/Ride/response/ConfirmRideResponse";
import { DriverDTO } from "../../Models/Driver/DriverDTO";
import RideRepository from "../../Repository/Ride/RideRepository";

export class ConfirmRideService {
  private rideRepository: RideRepository;

  constructor() {
    this.rideRepository = new RideRepository();
  }

  public getCurrentDateTime(): string{
    const now = new Date();
  
    // Formata para YYYY-MM-DD HH:mm:ss
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0'); 
    const hours = String(now.getHours()).padStart(2, '0'); 
    const minutes = String(now.getMinutes()).padStart(2, '0'); 
    const seconds = String(now.getSeconds()).padStart(2, '0'); 
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  public async confirmRide(requestBody: {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: DriverDTO;
    value: number;
  }) : Promise<ConfirmRideResponse>{
    try{
        const currentDateTime = this.getCurrentDateTime();
        const requestInfo = {
            ...requestBody,
            currentDateTime,
        }
        await this.rideRepository.saveRide(requestInfo);
        return {
            success: true,
        }
    }catch(error:unknown){
        throw new Error("");
    }
  }
}
