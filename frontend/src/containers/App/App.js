import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import LoginForm from '../../containers/LoginForm/LoginForm';
import ParcelList from '../../containers/ParcelList/ParcelList';

const PrivatRoute = ({ component: Component, authed, ...rest}) => (
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

  authenticate() {
    this.setState({
      authed: false
    });
  }

  render() {
    return (
        <Switch>
          <Route 
            exact 
            path="/" 
            render={(props) => <LoginForm {...props} authenticate={this.authenticate.bind(this)}/>}/>
          <PrivatRoute 
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
