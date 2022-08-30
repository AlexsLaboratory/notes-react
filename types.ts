export interface UserSignup {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface Error {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface FetchData {
    isOperational: boolean;
    message: string;
    errors?: Error;
    data: null | UserSignup;
    stack?: string;
}

export interface FetchResponse {
    response: Response;
    data: FetchData;
}

export interface FetchConfig {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    mode?: "cors" | "no-cors" | "same-origin";
    cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached";
    credentials?: "omit" | "same-origin" | "include";
    headers: Headers;
    redirect?: "follow" | "error" | "manual";
    referrer?: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
    body?: BodyInit | null;
}

export interface UserState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}