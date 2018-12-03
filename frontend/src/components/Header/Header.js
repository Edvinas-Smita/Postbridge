import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'
import Logo from '../Logo/Logo'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    root: {
        width: '100%',
      },
    appbar: {
        backgroundColor: theme.palette.common.white
    },
    grow: {
        flexGrow: 1,
    },
    grid: {
        margin: 0
    },
    gridRigth: {
        borderLeft: "1px solid",
        borderLeftColor: theme.palette.grey[200],
        padding: "16px"
    },
    userName: {
        fontWeight: "bold"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.grey[200],
        '&:hover': {
          backgroundColor: fade(theme.palette.grey[200], 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit * 3,
          width: 'auto',
        },
        color: theme.palette.grey[600],
      },
    searchIcon: {
        width: theme.spacing.unit * 5,
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
        borderTopRightRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        right: "0"
      },
      searchButton: {
          color: theme.palette.common.white,
          cursor: "pointer",
          '&:hover': {
            backgroundColor: "transparent",
          },
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
        float: "left",
      },
      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
  });


  

class Header extends Component {
  state = {
    logout: false,
    clicked: false
  }

  handleClick = () => {
    this.setState({clicked: true})
  }


    render() {
        const { classes } = this.props;
        if(this.state.clicked) {
          return <Redirect to="/"/>
        }
        return (
            <React.Fragment>
            <AppBar className={classes.appbar} position="fixed" >
            <Toolbar>
              <Logo/>
              <div className={classes.grow} />
              <div className={classes.search}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
                <div className={classes.searchIcon}>
                  <IconButton aria-label="SearchIcon" className={classes.searchButton} disableRipple>
                    <SearchIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.gridRigth}>
                <Grid spacing={24} container>
                  <Grid item>
                    <Avatar>NS</Avatar>
                  </Grid>
                  <Grid item >
                    <Typography variant="subtitle1" className={classes.userName}>
                      Name Surname
                    </Typography>
                    <Typography>
                      Product manager
                    </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="ExitToApp" onClick={() => this.handleClick()}>
                          <ExitToApp/>
                        </IconButton>
                    </Grid>
                </Grid>
                </div>
            </Toolbar>
          </AppBar>
          </React.Fragment>
          
        );
    }
};

export default withStyles(styles)(Header);