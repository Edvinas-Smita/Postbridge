import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import LoginForm from '../../containers/LoginForm/LoginForm';
import ParcelsList from '../../containers/ParcelsList/ParcelsList';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/parcels" component={ParcelsList} />
          <Redirect to="/" />
        </Switch>
    );
  }
}

export default App;
