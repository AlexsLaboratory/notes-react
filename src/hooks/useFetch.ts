import {FetchConfig, UserState} from "../../types";
import {useAuth, useAuthSet} from "../context/AuthContext";

const useFetch = () => {
    const auth = useAuth();
    const setAuth = useAuthSet();

    const baseURL = 'http://dev.lowe.lan';

    const originalRequest = async (url: string, config: FetchConfig) => {
        url = `${baseURL}${url}`
        let response = await fetch(url, config)
        let data = await response.json()
        return {response, data}
    }

    const refreshToken = async (authTokens: UserState) => {
        let response = await fetch(`${baseURL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refreshToken': authTokens.refreshToken})
        })
        let data = await response.json() as UserState;
        return {response, data};
    }

    const callFetch = async (url: string, config: FetchConfig) => {
        config.headers.set('Authorization', `Bearer ${auth?.accessToken}`);
        let {response, data} = await originalRequest(url, config)
        if (response.status === 401) {
            const {response: refreshResponse, data: refreshData} = await refreshToken(auth);
            if (refreshResponse.status === 200) {
                setAuth({...refreshResponse, isAuthenticated: true})

                config.headers.set('Authorization', `Bearer ${refreshData?.accessToken}`)

                let newResponse = await originalRequest(url, config)
                response = newResponse.response
                data = newResponse.data
            } else {
                setAuth({accessToken: null, refreshToken: null, isAuthenticated: false})
            }
        }

        return {response, data}
    }
    return callFetch;
}
export default useFetch;