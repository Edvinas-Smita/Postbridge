import React, { Component } from 'react';
import Button from '@material-ui/core/Button/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput/OutlinedInput'
import Grid from '@material-ui/core/Grid/Grid'

class LoginForm extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        this.props.history.push('/parcels');
    }

    render() {
        return (

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: '100vh'}}
            >
                <Grid item xs="auto" style={{ padding: 8}}>
                    <OutlinedInput
                        placeholder="Email"
                        margin="dense"
                        type="text"
                        fullWidth
                        labelWidth={0}
                    />
                </Grid>
                <Grid item xs="auto" style={{ padding: 8}}>
                    <OutlinedInput
                        placeholder="Password"
                        margin="dense"
                        type="password"
                        fullWidth
                        labelWidth={0}
                    />
                </Grid>
                <Grid item xs="auto" style={{ padding: 8}}>
                    <Button 
                        variant = "contained" 
                        color="primary"
                        onClick={this.handleSubmit}
                    >
                        Sign In
                    </Button>
                </Grid>
            </Grid> 
        );
    }
}

export default LoginForm;