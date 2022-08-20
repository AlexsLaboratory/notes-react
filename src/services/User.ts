interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface Error {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

interface UserResponse {
    isOperational: boolean;
    message: string;
    errors?: Error;
    data: null | User;
    stack?: string;
}

const BASE_URL = 'http://dev.lowe.lan';

export async function createUser(user: User): Promise<UserResponse> {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return response.json();
}