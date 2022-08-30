import {FetchResponse, UserSignup} from "../../types";

const BASE_URL = 'http://dev.lowe.lan';

export async function createUser(user: UserSignup): Promise<FetchResponse> {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    return {response, data};
}