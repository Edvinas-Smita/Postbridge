import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid/Grid';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import ArrowIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import TextField from '@material-ui/core/TextField/TextField';
import SelectedIcon from '@material-ui/icons/Done';
import ListItemText from '@material-ui/core/ListItemText';
import PlaneIcon from '@material-ui/icons/AirplanemodeActive';
import InputAdornment from '@material-ui/core/InputAdornment';

import Chip from '@material-ui/core/Chip';
import { STATUS } from '../../helpers';

import LocationSelect from '../../components/LocationSelect/LocationSelect'; 

const styles = theme => ({
    iconButton: {
      padding: '7px'
    },
    chip: {
        borderRadius: "5px",
        margin: theme.spacing.unit * 0.5,
      },
    planeIcon: {
        transform: 'rotate(90deg)',
        color: theme.palette.primary.dark
    },
    filterByText: {
        marginLeft: theme.spacing.unit
    },
    blueColor: {
        color: theme.palette.primary.dark
    },
    button: {
        height: '20px',
        borderRadius: '20px',
        width: '90px',
        fontSize: '12px',
        textTransform: 'none',
        float: 'right',
        marginTop:  theme.spacing.unit
    },

    menuMargin: {
        padding: theme.spacing.unit * 3,
    },
    textField: {
        marginRight: theme.spacing.unit,
    }
});

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
      },
    },
  };


class ParcelTableHeader extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            startLocationValue: '',
            endLocationValue: '',
            weightFromValue: '',
            weightToValue: '',
            createdFromValue: '',
            createdToValue: '',
            courierValue: '',
        };
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value, prop) {
        this.setState({
            [prop]: value
        });
    }

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    }

    handleMenuValues= (type, value) => {
        this.setState({[type]: value});
    }

    handleFilterChange = (filterBy1, filterBy2, value1, value2) => {
        this.props.setParcelFilter(filterBy1, value1);
        this.props.setParcelFilter(filterBy2, value2);
    };

    render () {
        const { classes } = this.props;

        return (
            <TableHead >
                <TableRow style={{marginBottom: '10px'}}>
                    <TableCell style={{width: '7%', fontWeight:'bold', padding: '0px'}}>
                        <Grid container alignItems="center">
                            DESTINATION 
                            <PopupState variant="popover" state={{width: '200px'}}>
                                {popupState => (
                                    <React.Fragment>
                                    <IconButton className={classes.iconButton} {...bindTrigger(popupState)}>
                                        <ArrowIcon fontSize="small"/> 
                                    </IconButton>  
                                    <Menu  
                                        {...bindMenu(popupState)} 
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                            }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                            }}
                                        getContentAnchorEl={null}
                                        disableAutoFocusItem>
                                    <Grid container direction="column" alignItems="flex-end"  className={classes.menuMargin}>
                                        <Grid container direction="row">
                                        <LocationSelect
                                            value={this.state.startLocationValue}
                                            onChange={this.handleChange}
                                            name={'startLocationValue'}
                                            MenuProps={MenuProps}
                                            emptyMenuItem={true}
                                            style={{width: '100px'}}/>
                                        <PlaneIcon className={classes.planeIcon}/>
                                        <LocationSelect
                                            value={this.state.endLocationValue}
                                            onChange={this.handleChange}
                                            name={'endLocationValue'}
                                            MenuProps={MenuProps}
                                            emptyMenuItem={true}
                                            style={{width: '100px'}}/>
                                        </Grid>
                                        <Button size="small"  variant="contained" color="primary" className={classes.button} onClick={() => {this.handleFilterChange('startLocation', 'endLocation', this.state.startLocationValue, this.state.endLocationValue); popupState.close();}}>Filter</Button>
                                    </Grid>
                                    </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        </Grid> 
                    </TableCell>
                    <TableCell style={{width: '7%', fontWeight:'bold', padding: '12px'}}></TableCell>
                    <TableCell style={{width: '8%', fontWeight:'bold', padding: '12px'}} >
                        <Grid container alignItems="center" >
                            <TableSortLabel 
                                active={this.props.sortBy === 'status'}
                                direction={this.props.sortOrder}
                                onClick={this.createSortHandler('status')} 
                                style={{width: '42%'}}>
                                STATUS
                            </TableSortLabel>
                            <IconButton className={classes.iconButton}>
                                <ArrowIcon fontSize="small"/>
                            </IconButton>
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '8%', fontWeight:'bold', padding: '12px'}}>
                        <Grid container alignItems="center">
                            DESCRIPTION
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '7%', fontWeight:'bold', padding: '12px'}} >
                        <Grid container alignItems="center">
                            <TableSortLabel 
                                active={this.props.sortBy === 'weight'}
                                direction={this.props.sortOrder}
                                onClick={this.createSortHandler('weight')} 
                                style={{width: '52%'}}>
                                WEIGHT
                            </TableSortLabel>
                            <IconButton className={classes.iconButton}>
                                <ArrowIcon fontSize="small"/>
                            </IconButton> 
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '7%', fontWeight:'bold', padding: '12px'}} >
                        <Grid container alignItems="center">
                            <TableSortLabel 
                                active={this.props.sortBy === 'createdDate'}
                                direction={this.props.sortOrder}
                                onClick={this.createSortHandler('createdDate')} 
                                style={{width: '62%'}}>
                                CREATED
                            </TableSortLabel> 
                            <IconButton className={classes.iconButton} >
                                <ArrowIcon fontSize="small"/>
                            </IconButton> 
                        </Grid>  
                    </TableCell>
                    <TableCell style={{width: '9%', fontWeight:'bold', padding: '12px'}}>
                        <Grid container alignItems="center">
                            COURIER
                            <IconButton className={classes.iconButton}>
                                <ArrowIcon fontSize="small"/>
                            </IconButton> 
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '12%', fontWeight:'bold', padding: '12px'}}></TableCell>
                </TableRow>
            </TableHead>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setParcelFilter: (filterBy, value) => dispatch(setParcelFilterAction(filterBy, value)),
});

const mapStateToProps = state => ({
    startLocation: state.parcels.startLocation,
    endLocation: state.parcels.endLocation,
    status: state.parcels.status,
    weightFrom: state.parcels.weightFrom,
    weightTo: state.parcels.weightTo,
    createdFrom: state.parcels.createdFrom,
    createdTo: state.parcels.createdTo,
    courier: state.parcels.courier,
    userId: state.parcels.userId,
    statusFilterCounter: state.parcels.statusFilterCounter,
    locations: state.others.locations,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ParcelTableHeader));
