import React from 'react';
// import './styles/Navbar.css';
import { withRouter, Link } from 'react-router-dom';
import Logout from './sub_components/Logout';
import { connect } from 'react-redux';
import { Navbar, Nav} from 'react-bootstrap'


const NavBar = (props) =>  {
    return(
        <div>
            <Navbar bg="primary" variant="dark" fixed="top">
                <Navbar.Brand><Link to="/" style={{"color":"white"}}>Panda Car Rental</Link></Navbar.Brand>
                <Nav className="mr-auto">
                    {
                        props.user ? "" :  <Link className="nav-item nav-link" to="/register">Register</Link>
                    }
                    {
                        props.user ? "" :  <Link className="nav-item nav-link" to="/login">Login</Link>  
                    }
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