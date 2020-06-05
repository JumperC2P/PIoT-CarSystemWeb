import React from 'react';
// import './styles/Navbar.css';
import { withRouter, Link } from 'react-router-dom';
import Logout from '../customer/Logout';
import { connect } from 'react-redux';
import { Navbar, Nav} from 'react-bootstrap'


const AdminNavBar = (props) =>  {
    return(
        <div>
            <Navbar bg="primary" variant="dark" fixed="top">
                <Navbar.Brand><Link to="/admin" style={{"color":"white"}}>Panda Car Rental - Admin</Link></Navbar.Brand>
                <Nav className="mr-auto">
                   <Link className="nav-item nav-link" to="/admin/dashboard">DashBoard</Link>
                   <Link className="nav-item nav-link" to="/admin/users">User Management</Link>
                   <Link className="nav-item nav-link" to="/admin/cars">Car Management</Link>
                </Nav>
                {
                    props.user ? <Logout /> : <div></div>
                }
            </Navbar>
        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        user: state.authentication.user
    }
}

export default withRouter(connect(mapStateToProps)(AdminNavBar));