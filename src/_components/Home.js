import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/Home.css';
import { Redirect } from 'react-router-dom';
import SearchAndResult from './sub_components/serach/SearchAndResult'

class Home extends Component{

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
                    <h1 className="ui home">Hi, {this.props.user.first_name}, Pick a car you want to book.</h1>
                </div>
                <SearchAndResult {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    user: state.authentication.user
})

export default connect(mapStateToProps)(Home);