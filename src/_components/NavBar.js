import React, {Component} from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import BasicNavBar from './sub_components/BasicNavBar';
import AdminNavBar from './admin/AdminNavBar';
import EngNavBar from './engineer/EngNavBar';


class NavBar extends Component  {

    render(){
        return (
            <Route render={(props) => {
                if(this.props && this.props.user &&this.props.user.role && this.props.user.role === 'Admin') {
                    console.log("admin")
                    return <AdminNavBar {...props} />;
                }else if(this.props && this.props.user && this.props.user.role && this.props.user.role === 'Engineer'){
                    console.log("engineer")
                    return <EngNavBar {...props} />;
                }else {
                    console.log("basic")
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