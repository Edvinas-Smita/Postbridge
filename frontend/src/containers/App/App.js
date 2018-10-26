import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import LoginForm from '../../containers/LoginForm/LoginForm';
import ParcelList from '../../containers/ParcelList/ParcelList';

const Auth = {
  isAuthenticated: true,
  authenticate() {
    this.isAuthenticated = true
  },
  signout() {
    this.isAuthenticated = false
  }
}

const PrivatRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      Auth.isAuthenticated === true
        ? <Component  {...props}/>
        : <Redirect to="/"/>
    )}/>
)

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <PrivatRoute exact path="/parcels" component={ParcelList} />
          <Redirect to="/" />
        </Switch>
    );
  }
}

export default App;
