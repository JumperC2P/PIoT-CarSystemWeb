import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/EngHome.css';
import { Redirect } from 'react-router-dom';

class EngHome extends Component{

    constructor(props){
        super(props);
    }

    render(){

        if (!this.props.user){
            return <Redirect to="login" />
        }

        return(
            <div className="content">
                <div className="home wrap">
                    <h1 className="ui home">Hi, {this.props.user.first_name}, Cars below need to be maintained.</h1>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    user: state.authentication.user
})

export default connect(mapStateToProps)(EngHome);