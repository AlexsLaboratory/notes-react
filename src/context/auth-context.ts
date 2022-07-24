import {createContext} from 'react';
import AuthContextProps from "../interfaces/AuthContextProps";

const defaultValue = localStorage.getItem("user") || {
    isAuthenticated: false,
    authToken: null,
    refreshToken: null
}

const AuthContext = createContext<AuthContextProps>(defaultValue as AuthContextProps)

export default AuthContext;