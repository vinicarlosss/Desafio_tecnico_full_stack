import React, { useState } from "react";
import { TravelHistoryFormInputs } from "../../Models/TravelHistoryFormInputs";

export function useTravelHistoryFormInputs(initialValue: TravelHistoryFormInputs){
    const [travelHistoryFormInputs, setTravelHistoryFormInputs] = useState<TravelHistoryFormInputs>(initialValue);
    function handleChange(event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>): void {
        const {name, value} = event.target;
        setTravelHistoryFormInputs((oldtravelHistoryFormInputs) => ({
            ...oldtravelHistoryFormInputs,
            [name]: value,
        }));
    };

    return {
        travelHistoryFormInputs,
        handleChange,
    };
};
