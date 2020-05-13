import { commonService } from '../_services/';
import { alertActions } from './';
import qs from 'qs';

export const commonActions = {
    getMakes,
    getSeatNumbers,
    getBodyTypes,
    getColors
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