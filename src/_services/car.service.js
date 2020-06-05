import qs from 'qs';
import { API_URL } from '../_constants';

export const carService = {
    getCarsWithparams,
    checkRecord,
    book,
    getRecords,
    cancelBooking,
    addCar,
    updateCar,
    removeCar
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

async function getRecords(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password})
    };
    
    const response = await fetch(API_URL + "/getRecords", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

async function cancelBooking(username, password, record) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, record})
    };
    
    const response = await fetch(API_URL + "/cancel_booking", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}


async function removeCar(username, password, car_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, car_id})
    };
    
    const response = await fetch(API_URL + "/removeCar", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}


async function addCar(username, password, car) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, car})
    };
    
    const response = await fetch(API_URL + "/addCar", requestOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}


async function updateCar(username, password, car) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, car})
    };
    
    const response = await fetch(API_URL + "/updateCar", requestOptions);
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
