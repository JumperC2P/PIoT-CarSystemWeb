import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/UserManagement.css';
import { Redirect } from 'react-router-dom';
import UserSearch from './UserSearch';
import RegisterBox from '../../customer/RegisterBox';
import {Button} from 'react-bootstrap';
import Popup from "reactjs-popup";

const AddUser = (props) => {
    return(
        <div>
            <Popup trigger={<Button variant="outline-danger">Add User</Button>}
                modal
                closeOnDocumentClick
                style={{"border-radius": "18px"}}
            >
                {(close)=>(
                        <div id="pop_model">
                            <a id="pop_close" onClick={close}>
                                &times;
                            </a>
                            <div id="pop_header" style={{}}> 
                                <span>   
                                    Add a new user
                                </span>
                            </div>
                            <div id="pop_content">
                                <RegisterBox />
                            </div>
                            <div id="pop_footer">
                                
                            </div>
                        </div>
                )}
            </Popup>
        </div>
    );
}

class UserManagement extends Component{

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
                    <h1 className="ui home">User Management</h1>
                </div>
                <div id="search-bar">
                    <AddUser {...this.props}/>
                </div>
                <UserSearch {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    user: state.authentication.user
})

export default connect(mapStateToProps)(UserManagement);