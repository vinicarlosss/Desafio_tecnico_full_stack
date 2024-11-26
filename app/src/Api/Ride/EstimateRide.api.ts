import { AxiosResponse } from "axios";
import { API_URL } from "../../Constants";
import { axiosInstance } from "../_base/axios.instance";
import { RideEstimateResponse } from "../../Models/RideEstimateResponse";


export async function EstimateRide({
  customer_id,
  origin,
  destination,
}: {
  customer_id: string;
  origin: string;
  destination: string;
}): Promise<AxiosResponse<RideEstimateResponse>>{
    const response = await axiosInstance.post(API_URL, {
        customer_id,
        origin,
        destination
    });
    return response;
}
