import React, {FunctionComponent} from 'react';
import {useAuth} from "../context/AuthContext";
import {Navigate, useLocation} from "react-router-dom";

interface OwnProps {
    children: React.ReactNode;
    message: string;
}

type Props = OwnProps;

const RequireAuth: FunctionComponent<Props> = (props) => {
    const auth = useAuth();
    const location = useLocation();
    if (!auth.isAuthenticated) {
        return (<Navigate to="/login" state={{path: location.pathname, alert: {message: props.message, type: "error"}}}/>);
    }
    return <>{props.children}</>;
};

export default RequireAuth;
