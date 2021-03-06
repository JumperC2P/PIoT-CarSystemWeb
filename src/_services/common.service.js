import { API_URL } from '../_constants';
import qs from 'qs';

export const commonService = {
    getMakes,
    getSeatNumbers,
    getBodyTypes,
    getColors,
    updateUserProfile,
    updatePassword,
    checkUserName
};

async function getMakes(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs.stringify({ username, password })
    };

    const response = await fetch(API_URL + "/getMakes", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

async function getSeatNumbers(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        body: qs.stringify({ username, password })
    };

    const response = await fetch(API_URL + "/getSeatNumbers", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

async function getBodyTypes(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs.stringify({ username, password })
    };

    const response = await fetch(API_URL + "/getBodyTypes", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

async function getColors(username, password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs.stringify({ username, password })
    };

    const response = await fetch(API_URL + "/getColors", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

async function updatePassword(user_id, username, email, old_password, new_password, first_name, last_name, role) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs.stringify({ user_id, username, email, old_password, new_password, first_name, last_name, role })
    };

    const response = await fetch(API_URL + "/updatePassword", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

async function updateUserProfile(user_id, a_username, a_password, username, email, password, first_name, last_name, role) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs.stringify({ user_id, a_username, a_password, username, email, password, first_name, last_name, role })
    };

    const response = await fetch(API_URL + "/updateUser", requestOptions);
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