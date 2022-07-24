interface AuthContextProps {
    isAuthenticated: boolean;
    authToken: string | null;
    refreshToken: string | null;
}

export default AuthContextProps;