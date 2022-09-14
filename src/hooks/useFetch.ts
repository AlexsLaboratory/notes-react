import { FetchConfig, UserState } from "../../types";
import { useAuth, useAuthSet } from "../context/AuthContext";

const useFetch = () => {
  const auth = useAuth();
  const setAuth = useAuthSet();

  const baseURL = "http://dev.lowe.lan";

  const originalRequest = async (url: string, config: FetchConfig) => {
    // eslint-disable-next-line no-param-reassign
    url = `${baseURL}${url}`;
    const response = await fetch(url, config);
    let data = null;
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }
    return { response, data };
  };

  const refreshToken = async (authTokens: UserState) => {
    const response = await fetch(`${baseURL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: authTokens.refreshToken }),
    });
    const data = await response.json() as UserState;
    return { response, data };
  };

  return async (url: string, config: FetchConfig) => {
    config.headers.set("Authorization", `Bearer ${auth?.accessToken}`);
    let {
      response,
      data,
    } = await originalRequest(url, config);
    if (response.status === 401) {
      const {
        response: refreshResponse,
        data: refreshData,
      } = await refreshToken(auth);
      if (refreshResponse.status === 200) {
        setAuth({
          ...refreshData,
          isAuthenticated: true,
        });

        config.headers.set("Authorization", `Bearer ${refreshData?.accessToken}`);

        const newResponse = await originalRequest(url, config);
        response = newResponse.response;
        data = newResponse.data;
      } else if (refreshResponse.status === 401) {
        setAuth({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      }
    }

    return {
      response,
      data,
    };
  };
};
export default useFetch;
