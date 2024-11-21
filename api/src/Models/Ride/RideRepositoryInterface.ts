import { EstimateRideResponse } from '../../Controller/Ride/response/EstimatedRideResponse';

export interface RideRepositoryInterface {
  calculateRoute(requestBody: { customer_id: string; origin: string; destination: string }): Promise<EstimateRideResponse>;
}
