import React, { Component } from 'react';
import '../styles/Logout.css';
import { connect } from 'react-redux';
import { userActions } from '../../_action';
import {Form, Button } from 'react-bootstrap'

class Logout extends Component{

    logout = () => {
        this.props.logout();
    }

    render(){
            return(
                <Form inline>
                    <Button variant="outline-light" onClick={this.logout}>Log Out</Button>
                </Form>
            );
    }

}

const actionCreators = {
    logout: userActions.logout
};

function mapStateToProps(state) {
    const { authentication } = state.authentication;
    return { authentication };
}

export default connect(mapStateToProps, actionCreators)(Logout);