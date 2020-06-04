import React from 'react';
// import './styles/Navbar.css';
import { withRouter, Link } from 'react-router-dom';
import Logout from '../sub_components/Logout';
import { connect } from 'react-redux';
import { Navbar, Nav} from 'react-bootstrap'


const EngNavBar = (props) =>  {
    return(
        <div>
            <Navbar bg="primary" variant="dark" fixed="top">
                <Navbar.Brand><Link to="/engineer" style={{"color":"white"}}>Panda Car Rental - Engineer</Link></Navbar.Brand>
                <Nav className="mr-auto">
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

export default withRouter(connect(mapStateToProps)(EngNavBar));