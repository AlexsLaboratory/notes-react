import Header from "../components/Header";
import {useLocation} from "react-router";
import React from "react";
import AlertProps from "../interfaces/AlertProps";
import Alert from "../components/Alert";
import {useAlert, useAlertSet} from "../context/AlertContext";

function App() {
    const alert = useAlert();
    const alertSet = useAlertSet();
    const location = useLocation();
    const data = location.state as AlertProps;
    console.log(alert);
    return (
        <>
            {alert.message !== "" && <Alert message={alert.message} type={alert.type} onClose={() => {
                alertSet({message: "", type: "success"});
            }}/>}
            <Header/>
        </>
    );
}

export default App;
