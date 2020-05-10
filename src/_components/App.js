import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import NavBar from './NavBar';
import { connect } from 'react-redux';
import Home from './Home';
import Login from './Login';
import Register from './Register';

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
                <Route exact path="/" render={(props) => {
                      if(this.props && this.props.user) {
                          return <Home {...props} />;
                      }else {
                          return <Login {...props} />;
                      }
                  }}/>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
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