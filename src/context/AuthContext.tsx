import React, {createContext, FunctionComponent, ReactNode, useContext, useState} from 'react';
import AuthContextProps from "../interfaces/AuthContextProps";

// const defaultValue = localStorage.getItem("user") || {
//     isAuthenticated: false,
//     accessToken: null,
//     refreshToken: null
// }
let defaultValue = localStorage.getItem("user");
let defaultValueJsonObject = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null
} as AuthContextProps;
if (defaultValue) {
    defaultValueJsonObject = JSON.parse(defaultValue);
}

const AuthContext = createContext<AuthContextProps>(defaultValueJsonObject as AuthContextProps);

const useAuthSet = () => {
    return useContext(AuthSetContext);
}

const AuthSetContext = createContext<Function>(useAuthSet);

interface OwnProps {
    children: ReactNode;
}

type Props = OwnProps;

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider: FunctionComponent<Props> = (props) => {
    const [auth, setAuth] = useState<AuthContextProps>(defaultValueJsonObject as AuthContextProps);

    const createAuth = (auth: AuthContextProps) => {
        localStorage.setItem("user", JSON.stringify(auth));
        setAuth(auth);
    }

    return (
        <AuthContext.Provider value={auth}>
            <AuthSetContext.Provider value={createAuth}>
                {props.children}
            </AuthSetContext.Provider>
        </AuthContext.Provider>
    );
};

export {AuthProvider, useAuth, useAuthSet};
