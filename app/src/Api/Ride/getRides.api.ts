import { AxiosResponse } from "axios";
import { API_URL } from "../../Constants";
import { TravelHistoryFormInputs } from "../../Models/TravelHistoryFormInputs";
import { axiosInstance } from "../_base/axios.instance";
import { GetRidesResponse } from "../../Models/GetRidesResponse";

export async function getRides(data : TravelHistoryFormInputs) : Promise<AxiosResponse<GetRidesResponse>>{
    const { customer_id, driver_id } = data;
    const response = await axiosInstance.get(`${API_URL}/ride/${customer_id||undefined}?driver_id=${driver_id}`, {})
    return response;
}