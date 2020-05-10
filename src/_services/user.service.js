import qs from 'qs';
import { API_URL } from '../_constants';

export const userService = {
    login,
    register,
    update,
    checkUserName
};

async function login(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs.stringify({ username, password })
    };

    const response = await fetch(API_URL + "/login", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

async function register(first_name, last_name, username, email, password, role) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs.stringify({first_name, last_name, username, email, password, role})
    };
    
    const response = await fetch(API_URL + "/register", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

async function checkUserName(username) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs.stringify({username})
    };
    
    const response = await fetch(API_URL + "/checkUserName", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

async function update(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs.stringify(user)
    };

    const response = await fetch(API_URL + "/users/authenticate", requestOptions);
    return handleResponse(response);;
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}