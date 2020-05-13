import { carService } from '../_services';
import { alertActions } from '.';

export const carActions = {
    getCarsWithparams,
    checkRecord,
    book,
    getRecords,
    cancelBooking,
    getGoogleEventUrl,
    transDateFormat
};

async function getCarsWithparams(username, password, params){

    return carService.getCarsWithparams(username, password, params)
            .then(
                response => { 
                    return response.result;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}

async function checkRecord(username, password){

    return carService.checkRecord(username, password)
            .then(
                response => { 
                    return response.result;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}

async function book(username, password, book_info){

    return carService.book(username, password, book_info)
            .then(
                response => { 
                    return response.result;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}

async function getRecords(username, password){

    return carService.getRecords(username, password)
            .then(
                response => { 
                    return response.result;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}
async function cancelBooking(username, password, record){

    return carService.cancelBooking(username, password, record)
            .then(
                response => { 
                    return response.result;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}

function getGoogleEventUrl(username, car, est_rent_date, est_return_date){
    // title
    var url ="http://www.google.com/calendar/event?action=TEMPLATE"
            + "&text=Car%20Rental%20Confirmation%20-%20Panda%20Car%20Rental" 
            + "&dates=";

    // date
    url = url + transDateFormat(est_rent_date) +'%2F' + transDateFormat(est_return_date);

    //location
    var lat = car.car_location.split(',')[0];
    var lng = car.car_location.split(',')[1];
    url = url + "&location=" + lat + "%2C" + lng;

    // description
    url = url + "&details=Hi%2C%20" + username + "%2C%20you%20rent%20a%20shared%20car%20from%20Panda%20Car%20Rental.%20The%20details%20are%20as%20below%3A%0ACar%20Manufacturer%3A%20" 
        + car.make + "%0AColor%3A%20" + car.color + "%0ASeat%20Number%3A%20" + car.seat_number + "%0ACost%20per%20hour%3A%20" + car.cost

    return url;
    
}

function transDateFormat(date){
    var temp = date.toJSON();
    var after = temp.slice(0,4)+temp.slice(5,7)+temp.slice(8,13)+temp.slice(14,16)+temp.slice(17,19)+'Z'
    return after;
}

// function sendOrder(order){
//     return orderService.sendOrder(order)
//             .then(
//                 orderId => { 
//                     if (orderId){
//                         return orderId;
//                     }else{
//                         alertActions.show_error("Order failed","Please contact with administrator.", null);
//                     }
//                 },
//                 error => {
//                     // dispatch(alertActions.error(error.toString()));
//                 }
//             );
// }