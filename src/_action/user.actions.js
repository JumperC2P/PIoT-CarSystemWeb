import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';


export const userActions = {
    login,
    logout,
    register,
    checkUserName
};

function login(user) {
    return dispatch => {

        userService.login(user.username, user.password)
            .then(
                response => { 
                    if (response){
                        let result = response.result;
                        if (result.length !== 0){
                            dispatch(success(user));
                            dispatch(alertActions.success("Login is successful.","", true, 1500));
                            history.push('/home');
                        }else{
                            dispatch(alertActions.error("Login failed","Please check your username and password."));
                        }
                        
                    }else{
                        dispatch(alertActions.error("Login failed","Please check your username and password."));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    // function request(email) { return { type: userConstants.LOGIN_REQUEST, email } }
    function success(user, role) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    return dispatch => {
        dispatch(success());
        dispatch(alertActions.success("Logout is successful.","", true, 1000));
        history.push('/'); 
    }
    function success() { return { type: userConstants.LOGOUT };}  
}

function register(user) {
    return dispatch => {

        userService.register(user.first_name, user.last_name, user.username, user.email, user.password, user.role)
            .then(
                response => { 
                    if (response){
                        let user = response.result;
                        if (user){
                            dispatch(success(user));
                            dispatch(alertActions.success("Thank you for registering.","", true, 1500));
                            history.push('/home');
                        }else{
                            dispatch(alertActions.error("Register failed","Please check your username and password."));
                        }
                        
                    }else{
                        dispatch(alertActions.error("Register failed","Please check your username and password."));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    // function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user, role) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function checkUserName(username) {
    return dispatch => {

        userService.checkUserName(username)
            .then(
                response => { 
                    if (response){
                        let result = response.result;
                        if (!result){
                            dispatch(alertActions.error("The username is already exist.","Please change another username."));
                        }
                         dispatch(success(result));
                    }else{
                        dispatch(alertActions.error("The username is already exist.","Please change another username."));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function success(result, error) { return { type: userConstants.REGISTER_CHECK_USERNAME, result, error } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
