import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import Grid from '@material-ui/core/Grid/Grid'
import  BackgroundImage from './background.png'
import { Typography } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import "./LoginForm.css"

const gridStyles = {
    minHeight: '100vh',
    backgroundImage: 'url('+BackgroundImage+')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}

const styles = {
    textField: {
        width:"400px"
    },
    input: {
        backgroundColor: "white"
    },
    typografy: {
        color: "white"
    },
  };

class LoginForm extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    handleSubmit() {
        this.props.authenticate(
            this.state.email, 
            this.state.password);
    }
    
    render() {
        const { classes } = this.props;

        if (this.props.authed === true) {
            let path = "/parcels"
            ///this.props.history.push(path);
            return <Redirect to={path} />
        }

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
                className={classes.typografy}
            >
                Sign in to your account
            </Typography>
            <Grid item xs={12} style={{ width:"400px", marginTop:"30px"}}>
                <a href="javascript:void(0)" className="active">Sign In</a>
                <a href="javascript:void(0)" style={{"padding":"10px"}}>Sign Up</a>
                <a href="javascript:void(0)" style={{"float":"right", textDecoration:"underline"}}>Forgot password?</a>
            </Grid>
            <Grid item xs={12} style={{ padding: 8}}>
                <TextField
                    placeholder="Email"
                    margin="dense"
                    type="text"
                    variant="outlined"
                    className={classes.textField}
                    inputProps={{className: classes.input}}
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                />
            </Grid>
            <Grid item xs={12} style={{ padding: 8}}>
                <TextField
                    placeholder="Password"
                    margin="dense"
                    type="password"
                    variant="outlined"
                    className={classes.textField}
                    inputProps={{className: classes.input}}
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                />
            </Grid>
            <Grid item xs={12} style={{ padding: 8}}>
                <Button 
                    variant = "contained" 
                    color="primary"
                    style={{textTransform: "none", width:"400px"}}
                    onClick={this.handleSubmit}
                >
                    Sign In
                </Button>
            </Grid>
        </Grid> 
        );
    }
}

export default withStyles(styles)(LoginForm)

