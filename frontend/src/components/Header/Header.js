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

import {logout} from '../../state-management/actions/auth';

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

  handleClick = () => {
    this.props.logout();
  };

  render() {
    const {classes} = this.props;
    return (
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar className={classes.toolbar}>
          <Logo/>
          <div className={classes.gridRight}>
            <Grid spacing={24} container justify='center' alignItems='center'>
              <Grid item>
                <Avatar src={this.props.user.imageLink} alt={this.props.user.firstName.slice(0, 1) + this.props.user.lastName.slice(0, 1)}/>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" className={classes.userName}>
                  {this.props.user.firstName + " " + this.props.user.lastName}
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
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const HeaderStyled = withStyles(styles)(Header);
export default connect(mapStateToProps, mapDispatchToProps)(HeaderStyled);
