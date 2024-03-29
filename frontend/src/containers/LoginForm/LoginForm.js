import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import Grid from '@material-ui/core/Grid/Grid'
import  BackgroundImage from './background.png'
import { Typography } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

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
        backgroundColor: "white",
        borderRadius: "4px"
    },
    typografy: {
        color: "white",
        fontWeight: "bold"
    },
    button:{
        color:"white",
        textTransform: "none",
        "&:hover": {
            backgroundColor: "transparent"
          },
        paddingLeft: "0",
        paddingBottom: "0",
        opacity: "0.5"
    },
    buttonActive:{
        fontWeight: "bold",
        opacity: "1.0"
    },
    buttonForgotPassword:{
        textDecoration: "underline",
        float: "right",
        paddingRight: "0"
    }
  };

class LoginForm extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    handleSubmit = (email, password) => {
        this.props.authorize({
            email: email, 
            password: password
        });
    }
    
    render() {
        const { classes } = this.props;
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
                <Button className={classNames(classes.button, classes.buttonActive)} disableRipple >Sign In</Button>
                <Button className={classes.button} disableRipple>Sign Up</Button>
                <Button className={classNames(classes.button, classes.buttonForgotPassword)} disableRipple>Forgot password?</Button>
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
                    error={this.props.error}
                />
            </Grid>
            <Grid item xs={12} style={{ padding: 8}}>
                <FormControl aria-describedby="auth-error-text" error={this.props.error}>
                    <TextField
                        placeholder="Password"
                        margin="dense"
                        type="password"
                        variant="outlined"
                        className={classes.textField}
                        inputProps={{className: classes.input}}
                        value={this.state.password}
                        onChange={this.handleChange("password")}
                        error={this.props.error}
                    />
                    {this.props.error === true &&
                        <FormHelperText 
                            id="auth-error-text"
                        >
                            Wrong username or password
                        </FormHelperText>
                    }
                </FormControl>
            </Grid>
            <Grid item xs={12} style={{ padding: 8}}>
                <Button 
                    variant = "contained" 
                    color="primary"
                    style={{textTransform: "none", width:"400px"}}
                    onClick={() => this.handleSubmit(this.state.email, this.state.password)}
                    disabled={this.props.isFetching}
                >
                    Sign In
                </Button>
            </Grid>
        </Grid> 
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching,
    error: state.auth.badCredentials,
});

const LoginFromStyled = withStyles(styles)(LoginForm);
export default connect(mapStateToProps, null)(LoginFromStyled);

