import { API_URL } from "../../Constants";
import { axiosInstance } from "../_base/axios.instance";

export async function getAllDrivers(){
    const response = await axiosInstance.get(`${API_URL}/driver/getAll`, {});
    return response;
}