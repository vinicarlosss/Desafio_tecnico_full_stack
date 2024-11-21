import  RideRepository  from "../../Repository/Ride/RideRepository";
import { EstimateRideMapper } from "../../Mapper/Ride/EstimateRideMapper";

export class EstimateRideService {
  private rideRepository: RideRepository;

  constructor() {
    this.rideRepository = new RideRepository();
  }

  public async estimateRide(requestBody: { customer_id: string; origin: string; destination: string }) {
    try {
      return await this.rideRepository.calculateRoute(requestBody);
    } catch (error) {
      throw new Error(`Erro ao calcular a estimativa da viagem: ${error.message}`);
    }
  }
}
