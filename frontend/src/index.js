import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import './index.css';

const theme = createMuiTheme({
  palette: {
      primary: blue,
  },
  typography: {
      useNextVariants: true,
  },
});

ReactDOM.render((
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </MuiThemeProvider>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
