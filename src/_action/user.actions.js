import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';


export const userActions = {
    login,
    logout,
    register
};

function login(user, history) {
    return dispatch => {

        userService.login(user.username, user.password)
            .then(
                response => { 
                    if (response){
                        let result = response.result;
                        if (result.length !== 0){
                            let user = result[0];
                            dispatch(success(user));
                            dispatch(alertActions.success("Login is successful.","", true, 1500));

                            if (user.role === 'Admin'){
                                history.push('/admin');
                            }else if (user.role === 'Engineer'){
                                history.push('/engineer');
                            }else{
                                history.push('/');
                            }

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
    }
    function success() { return { type: userConstants.LOGOUT };}  
}

function register(user, history) {
    return dispatch => {

        userService.register(user.first_name, user.last_name, user.username, user.email, user.password, user.role)
            .then(
                response => { 
                    if (response){
                        let user = response.result;
                        if (user){
                            dispatch(success(user));
                            dispatch(alertActions.success("Thank you for registering.","", true, 1500));
                            history.push('/');
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
