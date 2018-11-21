import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import store from './state-management/store/storeFactory';
import './index.css';

const theme = createMuiTheme({
  palette: {
      primary: blue,
      secondary: green
  },
  typography: {
      useNextVariants: true,
  },
});

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
