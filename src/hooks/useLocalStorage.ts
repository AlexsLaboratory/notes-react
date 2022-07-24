import {useState, useEffect} from "react";
import {getLocalStorage, setLocalStorage} from "../utils/localStorage";

function useLocalStorage<T>(key: string, defaultValue: T) {
    let [storedValue, setStoredValue] = useState(() => {
        let currentValue;

        try {
            currentValue = getLocalStorage(key, defaultValue);
        } catch (error) {
            currentValue = defaultValue;
        }

        return currentValue;
    });

    const setValue = (value: T) => {
        setStoredValue(value);
    };

    useEffect(() => {
        setLocalStorage(key, storedValue);
    }, [storedValue, key]);

    return [storedValue, setValue];
};

export default useLocalStorage;