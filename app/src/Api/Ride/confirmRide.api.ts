import { API_URL } from "../../Constants";
import { ConfirmRideRequest } from "../../Models/ConfirmRideRequest";
import { axiosInstance } from "../_base/axios.instance";

export async function confirmRide(data: ConfirmRideRequest) {
  const response = await axiosInstance.patch(`${API_URL}/ride/confirm`, data);
  return response;
}
