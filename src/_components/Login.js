import React, { Component } from 'react';
import './styles/Login.css';
import LoginBox from './sub_components/LoginBox';


class Login extends Component{

    render(){
        return (
            <div className="content">
                <div className="home wrap">
                    <h1 className="ui home">Welcome to Panda Car Rental!</h1>
                    <p id="sub-title"> Please login before you use our services.</p>
                </div>
                    <LoginBox />
            </div>
        );
    }
}

export default Login;