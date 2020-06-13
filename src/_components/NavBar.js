import React, {Component} from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import BasicNavBar from './customer/BasicNavBar';
import AdminNavBar from './admin/AdminNavBar';
import EngNavBar from './engineer/EngNavBar';
import ManagerNavBar from './manager/ManagerNavBar';


class NavBar extends Component  {

    render(){
        return (
            <Route render={(props) => {
                if(this.props && this.props.user &&this.props.user.role && this.props.user.role === 'Admin') {
                    return <AdminNavBar {...props} />;
                }else if(this.props && this.props.user && this.props.user.role && this.props.user.role === 'Engineer'){
                    return <EngNavBar {...props} />;
                }else if(this.props && this.props.user && this.props.user.role && this.props.user.role === 'Manager'){
                    return <ManagerNavBar {...props} />;
                }else {
                    return <BasicNavBar {...props} />;
                }
            }}/>
        
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.authentication.user
    }
}

export default withRouter(connect(mapStateToProps)(NavBar));