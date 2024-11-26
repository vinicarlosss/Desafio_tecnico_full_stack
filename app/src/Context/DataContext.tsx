import { createContext, useState } from "react";
import { DataContextType } from "../Models/DataContextType";
import { RideEstimateResponse } from "../Models/RideEstimateResponse";

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [sharedData, setSharedData] = useState<RideEstimateResponse | null>(null);
  return (
    <DataContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </DataContext.Provider>
  );
};
