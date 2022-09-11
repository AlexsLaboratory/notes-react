import React, {
  createContext, ReactNode, useContext, useState,
} from "react";
import AlertProps from "../interfaces/AlertProps";

const defaultValue = {
  message: "",
  type: "success",
};

const AlertContext = createContext<AlertProps>(defaultValue as AlertProps);

const AlertSetContext = createContext<Function>(useAlertSet);

function useAlertSet() {
  return useContext(AlertSetContext);
}

interface OwnProps {
  children: ReactNode;
}

type Props = OwnProps;

const useAlert = () => useContext(AlertContext);

function AlertProvider(props: Props) {
  const [alert, setAlert] = useState<AlertProps>(defaultValue as AlertProps);

  return (
    <AlertContext.Provider value={alert}>
      <AlertSetContext.Provider value={setAlert}>
        {props.children}
      </AlertSetContext.Provider>
    </AlertContext.Provider>
  );
}

export { AlertProvider, useAlert, useAlertSet };
