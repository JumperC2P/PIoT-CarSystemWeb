import qs from 'qs';
import { API_URL } from '../_constants';

export const carService = {
    getCarsWithparams,
    checkRecord,
    book
};


async function getCarsWithparams(username, password, params) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, params })
    };
    
    const response = await fetch(API_URL + "/getCarsWithparams", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

async function checkRecord(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    
    const response = await fetch(API_URL + "/checkRecord", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

async function book(username, password, book_info) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, book_info})
    };
    
    const response = await fetch(API_URL + "/book", requestOptions);
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
