import React, {Component} from 'react';
import {connect} from 'react-redux';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {Typography} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import Logo from '../Logo/Logo'

const styles = theme => ({
  appbar: {
    backgroundColor: theme.palette.common.white
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '0px'
  },
  grid: {
    margin: 0
  },
  gridRight: {
    borderLeft: "1px solid",
    borderLeftColor: theme.palette.grey[200],
    padding: "16px"
  },
  userName: {
    fontWeight: "bold"
  }
});

class Header extends Component {
  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <AppBar className={classes.appbar} position="fixed">
          <Toolbar className={classes.toolbar}>
            <Logo/>
            <div className={classes.gridRight}>
              <Grid spacing={24} container justify='center' alignItems='center'>
                <Grid item>
                  <Avatar>
                    {this.props.user.firstName.slice(0, 1) + this.props.user.lastName.slice(0, 1)}
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" className={classes.userName}>
                    {this.props.user.firstName + " " + this.props.user.lastName}
                  </Typography>
                </Grid>

                <Grid item>
                  <IconButton aria-label="ExitToApp">
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
}

const mapStateToProps = state => ({
  user: state.others.currentUser
});

export default connect(mapStateToProps, null)(withStyles(styles)(Header));