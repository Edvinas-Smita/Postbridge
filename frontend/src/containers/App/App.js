import React, { Component } from 'react';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import blue from '@material-ui/core/colors/blue';

import LoginForm from '../../containers/LoginForm/LoginForm';

const theme = createMuiTheme({
  palette: {
      primary: blue,
  },
  typography: {
      useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <LoginForm/>
      </MuiThemeProvider>
    );
  }
}

export default App;
