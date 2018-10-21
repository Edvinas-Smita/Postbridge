import React, { Component } from 'react';
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import Grid from '@material-ui/core/Grid/Grid'
import  BackgroundImage from './background.png'
import { Typography } from '@material-ui/core'
import "./LoginForm.css"

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
                <Typography 
                    variant="h5"
                    style={{color:"white"}}>
                    Sign in to your account
                </Typography>
                <Grid>
                    <a href="javascript:void(0)" className="active">Sign In</a>
                    <a href="javascript:void(0)">Sign Up</a>
                    <a href="javascript:void(0)">Forgot password?</a>
                </Grid>
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
                        style={{textTransform: "none"}}
                    >
                        Sign In
                    </Button>
                </Grid>
            </Grid> 
        );
    }
}

export default LoginForm;