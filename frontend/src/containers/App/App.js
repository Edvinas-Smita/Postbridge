import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import LoginForm from '../../containers/LoginForm/LoginForm';
import ParcelList from '../../containers/ParcelList/ParcelList';

const PrivateRoute = ({ component: Component, authed, ...rest}) => (
    <Route {...rest} render={(props) => (
      authed === true
        ? <Component  {...props}/>
        : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
    )}/>
)

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      authed: false
    }
  }

  authenticate(cb, email, password) {
    if (email === "test" && password === "test"){
      this.setState({
        authed: true
      });
      cb();
    }
  }

  render() {
    return (
        <Switch>
          <Route 
            exact 
            path="/" 
            render={(props) => <LoginForm {...props} authenticate={this.authenticate.bind(this)}/>}/>
          <PrivateRoute 
            exact 
            path="/parcels"
            component={ParcelList} 
            authed={this.state.authed}/>
        </Switch>
    );
  }
}

export default App;
