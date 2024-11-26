import React from "react";
import { RideEstimateResponse } from "./RideEstimateResponse";

export interface DataContextType {
    sharedData: RideEstimateResponse | null;
    setSharedData: React.Dispatch<React.SetStateAction<RideEstimateResponse | null>>;
}