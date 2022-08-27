interface AuthContextProps {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
}

export default AuthContextProps;