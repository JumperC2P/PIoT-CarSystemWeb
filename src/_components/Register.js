import React, { Component } from 'react';
import RegisterBox from './sub_components/RegisterBox';


class Register extends Component{

    render(){
        
        return(
            <div className="content">
                <div className="home wrap">
                    <h1 className="ui home">Register to Panda Car Rental!</h1>
                </div>
                <RegisterBox />
            </div>
        );
    }
}

export default Register;