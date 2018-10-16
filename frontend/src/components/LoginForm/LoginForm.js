import React, { Component } from 'react';
import Button from '@material-ui/core/Button/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput/OutlinedInput'

class LoginForm extends Component {
    render() {
        return (
            <div className="App">
                <OutlinedInput
                    placeholder="Email"
                    margin="normal"
                    type="text"
                    fullWidth
                />
                <OutlinedInput
                    placeholder="Password"
                    margin="normal"
                    type="password"
                    fullWidth
                />
                <Button 
                    variant = "contained" 
                    color="primary"
                >
                    Sign In
                </Button>
            </div>
        );
    }
}

export default LoginForm;