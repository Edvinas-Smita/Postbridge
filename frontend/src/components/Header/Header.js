import React, { Component } from 'react';
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
    appbar: {
        backgroundColor: "white"
    },
    grid: {
        margin: 0
    },
    gridRigth: {
        borderLeft: "1px solid #e6e6e6"
    },
    userName: {
        fontWeight: "bold"
    },
    /*
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit * 3,
          width: 'auto',
        },
      },
    */
      searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    /*
      inputRoot: {
        color: 'inherit',
        width: '100%',
      },
      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
*/
  });
  

class Header extends Component {
    render() {
        const { classes } = this.props;
        return (
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar>
                    <Grid container spacing={24} justify="center" alignItems="center" className={classes.grid}>
                        <Grid item xs={7} >
                            <Logo/>
                        </Grid>
                        <Grid item xs={2}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={2} spacing={24}  container>
                            <Grid item className={classes.gridRigth}>
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
                        </Grid>
                        <Grid item xs={1} spacing={0} container>
                            <Grid item >
                                <IconButton aria-label="ExitToApp">
                                    <ExitToApp/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
};

export default withStyles(styles)(Header);