import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/UserDetails.css';
import { Redirect } from 'react-router-dom';
import UserInfo from './UserInfo';
// import SearchAndResult from './customer/serach/SearchAndResult'

class UserDetails extends Component{

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
                    <h1 className="ui home">Hi, {this.props.user.first_name}. Welcome to member center.</h1>
                </div>
                <UserInfo targer_user = {this.props.user}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    user: state.authentication.user
})

export default connect(mapStateToProps)(UserDetails);