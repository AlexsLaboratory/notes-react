import AuthContext from "../context/auth-context";

function AuthProvider(props: any) {

    return (
        <AuthContext.Provider value={{
            isAuthenticated: false,
            authToken: null,
            refreshToken: null
        }}>
            {props.children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;
