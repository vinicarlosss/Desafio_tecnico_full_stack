import React, { useState } from "react";
import { FormInputs } from "../../Models/FormInputs";

export function useTravelRequestFormInputs(initialValue: FormInputs){
    const [travelRequestFormInputs, settravelRequestFormInputs] = useState<FormInputs>(initialValue);
    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const {name, value} = event.target;
        settravelRequestFormInputs((oldFormInputs) => ({
            ...oldFormInputs,
            [name]: value,
        }));
    };

    return {
        travelRequestFormInputs,
        handleChange,
    };
};
