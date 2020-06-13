import React from 'react';
// import './styles/Navbar.css';
import { withRouter, Link } from 'react-router-dom';
import Logout from '../customer/Logout';
import { connect } from 'react-redux';
import { Navbar, Nav} from 'react-bootstrap'


const ManagerNavBar = (props) =>  {
    return(
        <div>
            <Navbar bg="primary" variant="dark" fixed="top">
                <Navbar.Brand><Link to="/manager" style={{"color":"white"}}>Panda Car Rental - Manager</Link></Navbar.Brand>
                <Nav className="mr-auto">
                   <Link className="nav-item nav-link" to="/manager">Dashboard</Link>
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

export default withRouter(connect(mapStateToProps)(ManagerNavBar));