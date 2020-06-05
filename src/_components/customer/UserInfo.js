import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../styles/UserInfo.css';
import {Form, Button, Col} from 'react-bootstrap';
import { commonActions, alertActions, adminActions } from '../../_action';
import { sha256 } from 'js-sha256';
import $ from "jquery";
import { withRouter } from 'react-router-dom';
import Popup from "reactjs-popup";


const UserInfo = (props) => {
    const [validated, setValidated] = useState(false);
    const [pwdValidated, setPwdValidated] = useState(false);
    const [user, setUser] = useState(props.targer_user)

    const handleSubmit = async (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            let userInfo = {
                user_id: user.user_id,
                first_name : $('#validationFirstname').val(),
                last_name : $('#validationLastname').val(),
                username : user.username,
                password : user.password,
                email : $('#validationEmail').val(),
                role : 'Customer',
                a_username: props.user.username,
                a_password: props.user.password,
            }
            await commonActions.updateUserProfile(userInfo);
        }

        setValidated(true);
    };

    const onInputChange = () => {
        let target_user = {
            user_id: user.user_id,
            first_name : $('#validationFirstname').val(),
            last_name : $('#validationLastname').val(),
            username : $('#validationUsername').val(),
            password : user.password,
            email : $('#validationEmail').val(),
            role : 'Customer' 
        }

        setUser(target_user);
    }

    const onChangePassword = async () => {
        if ($('#old_password').val()){
            if (pwdValidated){
                let cp_user = {
                    user_id: user.user_id,
                    email: $('#validationEmail').val(),
                    first_name: $('#validationFirstname').val(),
                    last_name: $('#validationLastname').val(),
                    old_password: sha256($('#old_password').val()),
                    new_password: sha256($('#new_password').val()),
                    role: user.role,
                    username: $('#validationUsername').val()
                }
                await commonActions.updatePassword(cp_user);
            }else{
                alertActions.show_error("Please check your password.", "", null);
            }
        }else{
            alertActions.show_error("Please enter your old password.", "", null);
        }
    }

    const checkPassword = () => {
        if ( $('#new_password').val() !==  $('#confirm_password').val()){
            alertActions.show_error("Please check your password.", "", null);
            setPwdValidated(false);
        }else{
            setPwdValidated(true);
        }
    }

    const deleteUser = () => {
        alertActions.show_warning("Are you sure to delete the user?", "User ID: "+user.user_id, "Yes, delete it.", true, 0, async (isConfirm)=>{
            if (isConfirm.value){
                let result = await adminActions.deleteUser(props.user.username, props.user.password, user.user_id)
                if (result === true){
                    alertActions.show_success("You have deleted the user.", "", true, 0, ()=>{
                    });
                }else{
                    alertActions.show_error("Failed to delete the user", "", null);
                }
            }
        }, null)
    }
    
    const showPopup = () => {
        return <Popup trigger={<Button type="button">Change Passowrd</Button>}
                    modal
                    closeOnDocumentClick
                    style={{"border-radius": "18px"}}
                >
                    {(close)=>(
                            <div id="pop_model">
                                <a id="pop_close" onClick={close}>
                                    &times;
                                </a>
                                <center>

                                    <div id="pop_header" style={{}}> 
                                        <span>   
                                        Change Password
                                        </span>
                                    </div>
                                    <div id="pop_content">
                                        <dt className="">
                                            <span>Old Password:</span>
                                        </dt>
                                        <dd className="ui input pay_input">
                                            <input
                                                id = "old_password"
                                                type="password"
                                                required
                                                value={props.user.role==='Admin'?props.targer_user.password:""}
                                                disabled={props.user.role==='Admin'?true:false}
                                            />
                                        </dd>
                                        <dt className="">
                                            <span>New Password:</span>
                                        </dt>
                                        <dd className="ui input pay_input">
                                            <input
                                                id = "new_password"
                                                type="password"
                                                required
                                            />
                                        </dd>
                                        <dt className="">
                                            <span>Confirm Password:</span>
                                        </dt>
                                        <dd className="ui input pay_input">
                                            <input
                                                id = "confirm_password"
                                                type="password"
                                                required
                                                onBlur = {checkPassword}
                                            />
                                        </dd>
                                    </div>
                                    <div id="pop_footer">
                                        <Button className="menu-button" variant="success" type="button" onClick={onChangePassword}>
                                            Submit
                                        </Button> &nbsp;&nbsp;&nbsp;
                                        <Button className="menu-button" variant="danger" type="button" onClick={close}>
                                            Cancel
                                        </Button>
                                    </div>
                                </center>
                            </div>
                    )}
                </Popup>;
    }

    return(
            <div id="register-box">
                <Form noValidate validated={validated}>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="validationFirstname">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                value={user.first_name} 
                                onChange={onInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                    Please enter your first name.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationLastname">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                value={user.last_name} 
                                onChange={onInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                    Please enter your last name.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    required
                                    disabled
                                    value={user.username} 
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a username.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationPassword">
                                <Form.Label>Password</Form.Label>
                                <div>{showPopup()}</div>
                            </Form.Group>
                        </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="validationEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email"
                                placeholder="Enter email"
                                required
                                value={user.email} 
                                onChange={onInputChange}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Please enter an email address.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Button type="button" onClick={handleSubmit}>Update</Button>&nbsp;&nbsp;&nbsp;
                    {
                        props.user.role === 'Admin'?<Button variant="danger" type="button" onClick={deleteUser}>Delete User</Button>:""
                    }
                </Form>
            </div>
    );
}

const mapStateToProps = (state) => {
    return{
        user: state.authentication.user
    };
}

export default withRouter(connect(mapStateToProps)(UserInfo));
