import React from 'react';
// import './styles/Navbar.css';
import { withRouter } from 'react-router-dom';
import Logout from './sub_components/Logout';
import { connect } from 'react-redux';
import { Navbar, Nav} from 'react-bootstrap'


const NavBar = (props) =>  {
    return(
        <div>
            <Navbar bg="primary" variant="dark" fixed="top">
                <Navbar.Brand href="/">Panda Car Rental</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
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

export default withRouter(connect(mapStateToProps)(NavBar));