import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import NavBar from './NavBar';
import { connect } from 'react-redux';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ShowRecordsHistory from './ShowRecordsHistory';
import ProtectedRoute from './customer/ProtectedRoute';
import UserManagment from './admin/users/UserManagement';
import CarManagment from './admin/cars/CarManagment';
import AdminDashBoard from './admin/AdminDashBoard';
import EngHome from './engineer/EngHome';
import UserDetails from './customer/UserDetails';
import RentalHistory from './admin/rental/RentalHistory';

class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Router> 
          <div> 
              <NavBar />
              <Switch>
                <ProtectedRoute exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/records" component={ShowRecordsHistory} />
                <ProtectedRoute exact path="/member_center" component={UserDetails} />
                <ProtectedRoute exact path="/admin" component={AdminDashBoard} />
                <ProtectedRoute exact path="/admin/dashboard" component={AdminDashBoard} />
                <ProtectedRoute exact path="/admin/users" component={UserManagment} />
                <ProtectedRoute exact path="/admin/cars" component={CarManagment} />
                <ProtectedRoute exact path="/admin/rental_history" component={RentalHistory} />
                <ProtectedRoute exact path="/engineer" component={EngHome} />
              </Switch> 
          </div> 
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({ 
  user: state.authentication.user
})

export default connect(mapStateToProps)(App);
