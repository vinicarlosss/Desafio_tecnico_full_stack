import React, { useState } from "react";

export function UseFormInputs(initialValue: object){
    const [formInputs, setFormInputs] = useState(initialValue);
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
