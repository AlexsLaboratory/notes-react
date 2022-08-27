import React, {createContext, FunctionComponent, ReactNode, useContext, useState} from 'react';
import AlertProps from "../interfaces/AlertProps";

const defaultValue = {
    message: "",
    type: "success"
}

const AlertContext = createContext<AlertProps>(defaultValue as AlertProps);

const useAlertSet = () => {
    return useContext(AlertSetContext);
}

const AlertSetContext = createContext<Function>(useAlertSet);

interface OwnProps {
    children: ReactNode;
}

type Props = OwnProps;

const useAlert = () => {
    return useContext(AlertContext);
}

const AlertProvider: FunctionComponent<Props> = (props) => {
    const [alert, setAlert] = useState<AlertProps>(defaultValue as AlertProps);

    return (
        <AlertContext.Provider value={alert}>
            <AlertSetContext.Provider value={setAlert}>
                {props.children}
            </AlertSetContext.Provider>
        </AlertContext.Provider>
    );
};

export {AlertProvider, useAlert, useAlertSet};
