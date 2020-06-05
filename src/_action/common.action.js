import { commonService, userService } from '../_services/';
import { alertActions } from './';
import qs from 'qs';

export const commonActions = {
    getMakes,
    getSeatNumbers,
    getBodyTypes,
    getColors,
    updateUserProfile,
    updatePassword,
    checkUserName,
    addUser
};

async function getMakes(username, password) {
    return commonService.getMakes(username, password)
            .then(
                response => { 
                    if (response){
                        let makes = response.result;
                        if (makes){
                            return makes;
                        }else{
                            alertActions.show_info("Cannot get makes","Please call administrator.", null);
                        }
                        
                    }else{
                        alertActions.show_info("Cannot get makes","Please call administrator.", null);
                    }
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );

}

async function getSeatNumbers(username, password) {
    return commonService.getSeatNumbers(username, password)
        .then(
            response => { 
                if (response){
                    let seats = response.result;
                    if (seats){
                        return seats;
                    }else{
                        alertActions.show_info("Cannot get seat numbers","Please call administrator.", null);
                    }
                    
                }else{
                    alertActions.show_info("Cannot get seat numbers","Please call administrator.", null);
                }
            },
            error => {
                alertActions.show_error(error.toString(), "", null);
            }
        );
}

async function getBodyTypes(username, password) {
    return commonService.getBodyTypes(username, password)
            .then(
                response => { 
                    if (response){
                        let types = response.result;
                        if (types){
                            return types;
                        }else{
                            alertActions.show_info("Cannot get body types","Please call administrator.", null);
                        }
                        
                    }else{
                        alertActions.show_info("Cannot get body types","Please call administrator.", null);
                    }
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}

async function getColors(username, password) {
    return commonService.getColors(username, password)
            .then(
                response => { 
                    if (response){
                        let colors = response.result;
                        if (colors){
                            return colors;
                        }else{
                            alertActions.show_info("Cannot get colors","Please call administrator.", null);
                        }
                        
                    }else{
                        alertActions.show_info("Cannot get colors","Please call administrator.", null);
                    }
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}

async function updatePassword(user){
    return commonService.updatePassword(user.user_id, user.username, user.email, user.old_password, user.new_password, user.first_name, user.last_name, user.role)
            .then(
                response => { 
                    if (response){
                        let result = response.result;
                        if (result){
                            alertActions.show_success("Update Password successfully.", "", true, 0, null);
                            return response.returnObj;
                        }else{
                            let message = response.returnObj;
                            alertActions.show_error("Failed", message, null);
                        }
                    }else{
                        alertActions.show_error("Cannot update the user information.","", null);
                    }
                    return null;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                    return null;
                }
            );
}

async function updateUserProfile(user) {

    return commonService.updateUserProfile(user.user_id, user.a_username, user.a_password, user.username, user.email, user.password, user.first_name, user.last_name, user.role)
            .then(
                response => { 
                    if (response){
                        let result = response.result;
                        if (result){
                            alertActions.show_success("Update successfully.", "", true, 0, null);
                            return response.returnObj;
                        }else{
                            let message = response.returnObj;
                            alertActions.show_error("Failed", message, null);
                        }
                    }else{
                        alertActions.show_error("Cannot update the user information.","", null);
                    }
                    return null;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                    return null;
                }
            );
}

async function checkUserName(username) {
    return commonService.checkUserName(username)
            .then(
                response => { 
                    if (response){
                        let result = response.result;
                        if (!result){
                            alertActions.show_error("The username is already exist.","Please change another username.");
                        }
                    }else{
                        alertActions.show_error("The username is already exist.","Please change another username.");
                    }
                }
            );
}

function addUser(user) {
    return userService.register(user.first_name, user.last_name, user.username, user.email, user.password, user.role)
            .then(
                response => { 
                    if (response){
                        let user = response.result;
                        if (user){
                            alertActions.show_success("The user is added.","", true, 1500);
                        }else{
                            alertActions.show_error("Register failed","Please check your username and password.");
                        }
                        
                    }else{
                        alertActions.show_error("Register failed","Please check your username and password.");
                    }
                }
            );
}