import { Ride } from "../../../Models/Ride/Ride";

export interface GetRidesResponse{
    customer_id: string;
    rides: Ride[];
}