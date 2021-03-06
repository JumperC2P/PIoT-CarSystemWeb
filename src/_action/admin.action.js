import { adminService } from '../_services';
import { alertActions } from './alert.actions';
import qs from 'qs';

export const adminActions = {
    updateDiaryParameters,
    deleteDiaryParameters,
    recoverDiaryParameters,
    getUsersWithparams,
    deleteUser,
    reportCar,
    getReports,
    closeReport
};

async function updateDiaryParameters(userId, target, description, close) {

    return adminService.updateDiaryParameters(userId, target, description)
            .then(
                response => { 
                    if (response){
                        let result_code = response.resultCode;
                        if (result_code === 0){
                            let resultObj = qs.parse(response.returnObj);
                            alertActions.show_success("The option is added.", "ID: " + resultObj.id + "; Description: " + resultObj.description, true, 0, close())
                            return resultObj;
                        }else if (result_code === 1){
                            let message = response.returnObj;
                            alertActions.show_info("Failed", message, null);
                        }else{
                            let message = response.returnObj;
                            alertActions.show_error("Failed", message, null);
                        }
                    }else{
                        alertActions.show_error("Cannot add option.","", null);
                    }
                    return null;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                    return null;
                }
            );
}

async function deleteDiaryParameters(userId, target, deleteOptions) {
    return adminService.deleteDiaryParameters(userId, target, deleteOptions)
            .then(
                response => { 
                    if (response){
                        let result_code = response.resultCode;
                        if (result_code === 0){
                            let resultObj = response.returnObj;
                            alertActions.show_success("Deletion is completed successfully.", "", true, 0, null);
                            return resultObj;
                        }else if (result_code === 1){
                            let message = response.returnObj;
                            alertActions.show_info("Failed", message, null);
                        }else{
                            let message = response.returnObj;
                            alertActions.show_error("Failed", message, null);
                        }
                    }else{
                        alertActions.show_error("Cannot delete option.","", null);
                    }
                    return null;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                    return null;
                }
            );
}

async function recoverDiaryParameters(userId, target, recoverOptions) {

    return adminService.recoverDiaryParameters(userId, target, recoverOptions)
            .then(
                response => { 
                    if (response){
                        let result_code = response.resultCode;
                        if (result_code === 0){
                            let resultObj = response.returnObj;
                            alertActions.show_success("Recovery is completed successfully.", "", true, 0, null);
                            return resultObj;
                        }else if (result_code === 1){
                            let message = response.returnObj;
                            alertActions.show_info("Failed", message, null);
                        }else{
                            let message = response.returnObj;
                            alertActions.show_error("Failed", message, null);
                        }
                    }else{
                        alertActions.show_error("Cannot recover option.","", null);
                    }
                    return null;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                    return null;
                }
            );
}

async function getUsersWithparams(username, password, params){

    return adminService.getUsersWithparams(username, password, params)
            .then(
                response => { 
                    return response.result;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}

async function getReports(username, password, ){

    return adminService.getReports(username, password)
            .then(
                response => { 
                    return response.result;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}

async function deleteUser(username, password, user_id){

    return adminService.deleteUser(username, password, user_id)
            .then(
                response => { 
                    return response.result;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}

async function reportCar(username, password, car_id, user_id, issue){

    return adminService.reportCar(username, password, car_id, user_id, issue)
            .then(
                response => { 
                    return response.result;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}

async function closeReport(username, password, report_id, car_id, engineer_id){

    return adminService.closeReport(username, password, report_id, car_id, engineer_id)
            .then(
                response => { 
                    return response.result;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}