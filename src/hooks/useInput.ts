import {useState} from 'react';

export interface ErrorMessage {
    onEmpty: string;
    onInvalid: string;
}

export const useInput = (validateValue: Function, errorMessage: ErrorMessage) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const [valueIsValid, message] = validateValue(enteredValue, errorMessage);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event: any) => {
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = (event: any) => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        errorMessage: message,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
};