import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';

import LoginForm from '../../containers/LoginForm/LoginForm';
import ParcelList from '../../containers/ParcelList/ParcelList';

const PrivateRoute = ({ component: Component, authed, user, ...rest}) => (
    <Route {...rest} render={(props) => (
      authed === true
        ? <Component  {...props} userId={user.id}/>
        : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
    )}/>
);

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      authed: false,
      error: false,
      user: {
        id: "",
        name: ""
      } 
    }
  }

  authenticate(cb, email, password) {
    let auth = (email === "test" && password === "test");
    this.setState({
      authed: true,
      error: !auth,
      user: {
        id: 1, 
        name: "Test User"}},
      cb);
  }

    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => <LoginForm {...props}
                                                  error={this.state.error}
                                                  authenticate={this.authenticate.bind(this)}
                    />}
                />
                <PrivateRoute
                    exact
                    path="/parcels"
                    component={ParcelList}
                    authed={this.state.authed}
                    user={this.state.user}
                />
            </Switch>
        );
    }
}

export default App;
