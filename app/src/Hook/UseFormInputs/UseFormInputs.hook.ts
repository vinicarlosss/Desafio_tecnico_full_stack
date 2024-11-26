import React, { useState } from "react";
import { FormInputs } from "../../Models/FormInputs";

export function useFormInputs(initialValue: FormInputs){
    const [formInputs, setFormInputs] = useState<FormInputs>(initialValue);
    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const {name, value} = event.target;
        setFormInputs((oldFormInputs) => ({
            ...oldFormInputs,
            [name]: value,
        }));
    };

    return {
        formInputs,
        handleChange,
    };
};
