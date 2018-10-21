import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import Grid from '@material-ui/core/Grid/Grid'
import  BackgroundImage from './background.png'

const gridStyles = {
    minHeight: '100vh',
    backgroundImage: 'url('+BackgroundImage+')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}

class LoginForm extends Component {
    render() {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={gridStyles}
            >
                <Grid item xs="auto" style={{ padding: 8}}>
                    <TextField
                        placeholder="Email"
                        margin="dense"
                        type="text"
                        variant="outlined"
                        fullWidth
                        style={{backgroundColor:"white"}}
                    />
                </Grid>
                <Grid item xs="auto" style={{ padding: 8}}>
                    <TextField
                        placeholder="Password"
                        margin="dense"
                        type="password"
                        variant="outlined"
                        fullWidth
                        style={{backgroundColor:"white"}}
                    />
                </Grid>
                <Grid item xs="auto" style={{ padding: 8}}>
                    <Button 
                        variant = "contained" 
                        color="primary"
                    >
                        Sign In
                    </Button>
                </Grid>
            </Grid> 
        );
    }
}

export default LoginForm;