import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/AdminDashBoard.css';
import { Redirect } from 'react-router-dom';
// import SearchAndResult from './sub_components/serach/SearchAndResult'

class AdminDashBoard extends Component{

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
                    <h1 className="ui home">Hi, {this.props.user.first_name}, Welcome to Admin Dashboard.</h1>
                </div>
                <center>
                    <iframe style={{border:"0", width:"80%", height:"1024px"}}  src="https://datastudio.google.com/embed/reporting/efb24e07-bb4f-4fad-b271-2e22a3f19b19/page/nFDTB" frameborder="0" allowfullscreen></iframe>
                </center>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    user: state.authentication.user
})

export default connect(mapStateToProps)(AdminDashBoard);