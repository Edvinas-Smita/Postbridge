import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import LoginForm from '../../containers/LoginForm/LoginForm';
import ParcelList from '../../containers/ParcelList/ParcelList';

const PrivateRoute = ({ component: Component, authed, ...rest}) => (
    <Route {...rest} render={(props) => (
      authed === true
        ? <Component  {...props}/>
        : <Redirect to='/'/>
    )}/>
)

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      authed: false
    }
  }

  authenticate(email, password) {
    if (email === "test" && password === "test"){
      this.setState({
        authed: true
      });
    }
  }

  render() {
    return (
        <Switch>
          <Route 
            exact 
            path="/" 
            render={(props) => <LoginForm {...props} authed={this.state.authed} authenticate={this.authenticate.bind(this)}/>}/>
          <PrivateRoute 
            exact 
            path="/parcels"
            component={ParcelList} 
            authed={this.state.authed}/>
          <Redirect to="/" />
        </Switch>
    );
  }
}

export default App;
