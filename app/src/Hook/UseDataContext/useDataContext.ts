import {  useContext } from "react";
import { DataContext } from "../../Context/DataContext";

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
      throw new Error("useDataContext deve ser usado com um DataProvider");
    }
    return context;
  };

