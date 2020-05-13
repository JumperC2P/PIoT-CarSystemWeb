import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../styles/Login.css';
import {Form, Button, InputGroup, Col} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { userActions } from '../../_action';
import { sha256 } from 'js-sha256';
import $ from "jquery";

const LoginBox = (props) => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            let user = {
                username: $('#validationCustomUsername').val(), 
                password: sha256($('#validationPassword').val())
            };
            props.login(user, props.history)
        }
        
        setValidated(true);
    };

    return(
        
            <div className="form-box">
                <Form noValidate validated={validated}>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                            <Form.Label>Username:</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="validationPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control 
                                type="password"
                                placeholder="Password" 
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please enter your password.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Button type="button" onClick={handleSubmit}>Login</Button>
                    <span>
                        &nbsp;&nbsp;or &nbsp;&nbsp;
                        <Link to="/register">Register</Link>
                    </span>
                </Form>
            </div>
    );
}

const actionCreators = {
    login: userActions.login
};

const mapStateToProps = (state) => ({ 
})

export default withRouter(connect(mapStateToProps, actionCreators)(LoginBox));