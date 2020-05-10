import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/Home.css';

class Home extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="home wrap">
                <h1 className="ui home">Hi, {this.props.user.username}</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    user: state.authentication.user
})

export default connect(mapStateToProps)(Home);