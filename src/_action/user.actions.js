import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';


export const userActions = {
    login,
    logout,
    register
};

function login(user) {
    return dispatch => {

        userService.login(user.username, user.password)
            .then(
                response => { 
                    if (response){

                        console.log(response);

                        let result = response.result;
                        console.log(result);
                        if (result.length !== 0){
                            dispatch(success(user));
                            dispatch(alertActions.success("Login is successful.","", true, 1500));
                            history.push('/');
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

function register(role, name, email, password) {
    return dispatch => {

        userService.register(role, name, email, password)
            .then(
                user => { 

                    if (user){

                        let role = 2;
                        if(user.id.substring(0,1) === "a"){
                            role = 1;
                        }

                        dispatch(success(user, role));
                        dispatch(alertActions.success("Registration successful.","", true, 0));
                        if(role === 1){
                            history.push('/admin');
                        }else{
                            history.push('/content');
                        }
                    }else{
                        dispatch(alertActions.error("Login failed","Please check your email and password."));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    // function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user, role) { return { type: userConstants.REGISTER_SUCCESS, user, role } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
