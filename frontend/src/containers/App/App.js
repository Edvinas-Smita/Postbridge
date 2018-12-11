import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import { withRouter } from "react-router";
import './App.css';

import LoginForm from '../../containers/LoginForm/LoginForm';
import ParcelList from '../../containers/ParcelList/ParcelList';

import { login as loginAction } from '../../state-management/actions/auth';

const  PrivateRoute = ({ component: Component, authed, ...rest}) => (
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
      redirect: ""
    }
    this.authorize = this.authorize.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      this.setState({redirect: "/parcels"});
    }
    else if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
      this.setState({redirect: "/"});
    }
    else {
      this.setState({redirect: ""})
    }
  }
  authorize(credentials){
    this.props.login(credentials);
  }

  render() {
    if (this.state.redirect !== ""){
      return <Redirect to={this.state.redirect}/>
    }
    return (
        <Switch>
          <Route 
            exact 
            path="/" 
            render={(props) => <LoginForm {...props} authorize={this.authorize}/>}/>
          <PrivateRoute  
            path="/parcels"
            component={ParcelList} 
            authed={this.props.isAuthenticated}
            />
          <Redirect to="/" />
        </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(loginAction(email, password))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));