import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../styles/RegisterBox.css';
import {Form, Button, Col} from 'react-bootstrap';
import { userActions, commonActions } from '../../_action';
import { sha256 } from 'js-sha256';
import $ from "jquery";
import { withRouter } from 'react-router-dom';

const RegisterBox = (props) => {
    const [validated, setValidated] = useState(false);

    const checkValidity = () => {
        var isValid = true;
        if ($('#validationFirstname').val().length === 0){
            isValid = false;
        } else if ($('#validationLastname').val().length === 0){
            isValid = false;
        } else if ($('#validationUsername').val().length === 0){
            isValid = false;
        } else if ($('#validationPassword').val().length === 0){
            isValid = false;
        } else if ($('#validationEmail').val().length === 0){
            isValid = false;
        }
        return isValid;
    }

    const handleSubmit = (event) => {

        if (checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            let userInfo = {
                first_name : $('#validationFirstname').val(),
                last_name : $('#validationLastname').val(),
                username : $('#validationUsername').val(),
                password : sha256($('#validationPassword').val()),
                email : $('#validationEmail').val(),
                role : !props.user?'Customer':$('select#validationRole option:checked')[0].id
            }
            if (props.user.role === 'Admin'){
                commonActions.addUser(userInfo);
            }else{
                props.register(userInfo, props.history);
            }
        }

        setValidated(true);
    };

    const checkUserName = async () => {
        let username = $('#validationUsername').val();

        if (username){
            await commonActions.checkUserName(username);
        }
    }

    return(
            <div id="register-box">
                <Form noValidate validated={validated}>
                    {
                        props.user?
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="validationRole">
                                <Form.Label>Role </Form.Label>
                                <Form.Control as="select" custom="true">
                                    <option id="Customer" className="select list" value="Customer" defaultChecked={true}>Customer</option>)
                                    <option id="Admin" className="select list" value="Administrator">Administrator</option>)
                                    <option id="Engineer" className="select list" value="Engineer">Engineer</option>)
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>:""
                    }
                    
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="validationFirstname">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
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
                                onBlur={checkUserName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a username.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a password.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="validationEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"  required/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Please enter an email address.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    {
                        props.user ? "":
                            <Form.Group>
                                <Form.Check
                                    required
                                    label="Agree to terms and conditions"
                                    feedback="You must agree before submitting."
                                />
                            </Form.Group>
                    }
                    {
                        props.user ? <Button type="button" onClick={handleSubmit}>Add</Button>:<Button type="button" onClick={handleSubmit}>Register</Button>
                    }
                </Form>
            </div>
    );
}

const actionCreators = {
    register: userActions.register
};

const mapStateToProps = (state) => {
    return{
        check_user_name: state.authentication.check_user_name,
        user: state.authentication.user
    };
}

export default withRouter(connect(mapStateToProps, actionCreators)(RegisterBox));
