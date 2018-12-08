import React, {Component} from 'react';

import {withStyles} from "@material-ui/core/styles";
import {connect} from 'react-redux';
import {setParcelFilter as setParcelFilterAction} from '../../state-management/actions/parcels';

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
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state/index';
import TextField from '@material-ui/core/TextField/TextField';
import SelectedIcon from '@material-ui/icons/Done';
import ListItemText from '@material-ui/core/ListItemText';
import PlaneIcon from '@material-ui/icons/AirplanemodeActive';
import InputAdornment from '@material-ui/core/InputAdornment';

import Chip from '@material-ui/core/Chip';
import {STATUS} from '../../helpers';

import LocationSelect from '../../components/LocationSelect/LocationSelect';
import UserAutoFill from '../UserAutofill/UserAutoFill';

const styles = theme => ({
    iconButton: {
      padding: '7px'
    },
    chip: {
        borderRadius: "5px",
        margin: theme.spacing.unit * 0.5,
        color: theme.palette.common.white,
        backgroundColor: theme.palette.secondary.light
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
    },
    menuOverflow: {
        overflow: 'visible'
    }
});

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        width: 150,
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
            selectedCourierOptions: [],
            selectedRecipientOptions: []
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
    };

    handleMenuValues= (type, value) => {
        this.setState({[type]: value});
    };

    handleFilterChange = (filterBy1, filterBy2, value1, value2) => {
        this.props.setParcelFilter(filterBy1, value1);
        this.props.setParcelFilter(filterBy2, value2);
    };

    render () {
        const { classes } = this.props;
        const courierOptions = this.props.allCouriers.map(user => ({value: user.id, label: user.firstName + " " + user.lastName}));
        const recipientOptions = this.props.allRecipients.map(user => ({value: user.id, label: user.firstName + " " + user.lastName}));

        return (
            <TableHead >
                <TableRow style={{marginBottom: '10px'}}>
                    <TableCell style={{width: '8%', fontWeight:'bold', padding: '0px'}}>
                        <Grid container alignItems="center">
                            DESTINATION 
                            <PopupState variant="popover">
                                {popupState => (
                                    <React.Fragment>
                                    <IconButton className={classes.iconButton} {...bindTrigger(popupState)}>
                                        <ArrowIcon fontSize="small"/> 
                                    </IconButton>  
                                    <Menu onEnter={this.state.startLocationValue !== this.props.startLocation && this.state.endLocationValue !== this.props.endLocation ? () => {this.handleMenuValues('startLocationValue', ''); this.handleMenuValues('endLocationValue', '');}   : null}
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
                    <TableCell style={{width: '7%', fontWeight:'bold', padding: '0px'}}/>
                    <TableCell style={{width: '8%', fontWeight:'bold', padding: '5px'}} >
                        <Grid container alignItems="center" >
                            <TableSortLabel 
                                active={this.props.sortBy === 'status'}
                                direction={this.props.sortOrder}
                                onClick={this.createSortHandler('status')} 
                                style={{width: '42%'}}>
                                STATUS
                            </TableSortLabel>
                            <PopupState variant="popover" >
                                {popupState => (
                                    <React.Fragment>
                                    <IconButton className={classes.iconButton} {...bindTrigger(popupState)}> <ArrowIcon fontSize="small"/> </IconButton>  
                                    <Menu {...bindMenu(popupState) }
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                              }}
                                              getContentAnchorEl={null}>
                                        <MenuItem  onClick={() => this.props.setParcelFilter('status', 0)}  >
                                            {this.props.status[0] ? <SelectedIcon className={classes.blueColor}/> : null}
                                                <ListItemText disableTypography primary="Open" className={this.props.status[0] ? classes.blueColor : null}/>
                                            </MenuItem>
                                            <MenuItem  onClick={() => this.props.setParcelFilter('status', 1)}  >
                                            {this.props.status[1] ? <SelectedIcon className={classes.blueColor} /> : null}
                                                <ListItemText disableTypography primary="Picked up" className={this.props.status[1] ? classes.blueColor : null}/> 
                                            </MenuItem>
                                            <MenuItem  onClick={() => this.props.setParcelFilter('status', 2)}  >
                                            {this.props.status[2] ? <SelectedIcon className={classes.blueColor}/> : null}
                                                <ListItemText disableTypography primary="On the way" className={this.props.status[2] ? classes.blueColor : null}/> 
                                            </MenuItem>
                                            <MenuItem  onClick={() => this.props.setParcelFilter('status', 3)}  >
                                            {this.props.status[3] ? <SelectedIcon className={classes.blueColor}/> : null}
                                                <ListItemText disableTypography primary="Delivered" className={this.props.status[3] ? classes.blueColor : null}/> 
                                            </MenuItem> 
                                    </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '8%', fontWeight:'bold', padding: '5px'}}>
                        <Grid container alignItems="center">
                            DESCRIPTION
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '7%', fontWeight:'bold', padding: '5px'}} >
                        <Grid container alignItems="center">
                            <TableSortLabel 
                                active={this.props.sortBy === 'weight'}
                                direction={this.props.sortOrder}
                                onClick={this.createSortHandler('weight')} 
                                style={{width: '52%'}}>
                                WEIGHT
                            </TableSortLabel>
                            <PopupState variant="popover"  >
                                {popupState => (
                                    <React.Fragment>
                                    <IconButton className={classes.iconButton} {...bindTrigger(popupState)}> <ArrowIcon fontSize="small"/> </IconButton>  
                                    <Menu {...bindMenu(popupState)}  onEnter={this.state.weightFromValue !== this.props.weightFrom && this.state.weightToValue !== this.props.weightTo ? () => {this.handleMenuValues('weightFromValue', ''); this.handleMenuValues('weightToValue', '');}   : null}
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
                                    <Grid container direction="row" >
                                        <TextField
                                            id='weightFrom'
                                            style={{width:'6em'}}
                                            value={this.state.weightFromValue}
                                            label="From"
                                            onChange={(e) => this.handleMenuValues('weightFromValue',e.target.value)}
                                            type="number"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                            }}
                                            />
                                        <TextField
                                            id='weightTo'
                                            style={{width:'6em'}}
                                            label="To"
                                            value={this.state.weightToValue}
                                            onChange={(e) => this.handleMenuValues('weightToValue',e.target.value)}
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                            }}
                                            />
                                    </Grid>
                                    <Button size="small"  variant="contained" color="primary" className={classes.button} onClick={() => {this.handleFilterChange('weightFrom', 'weightTo', this.state.weightFromValue, this.state.weightToValue); popupState.close();}}>Filter</Button>
                                    </Grid>
                                    </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                            
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '7%', fontWeight:'bold', padding: '5px'}} >
                        <Grid container alignItems="center">
                            <TableSortLabel 
                                active={this.props.sortBy === 'createdDate'}
                                direction={this.props.sortOrder}
                                onClick={this.createSortHandler('createdDate')} 
                                style={{width: '62%'}}>
                                CREATED
                            </TableSortLabel> 
                            <PopupState variant="popover"  >
                                {popupState => (
                                    <React.Fragment>
                                    <IconButton className={classes.iconButton} {...bindTrigger(popupState)}> <ArrowIcon fontSize="small"/> </IconButton>  
                                    <Menu {...bindMenu(popupState)}  onEnter={this.state.createdFromValue !== this.props.createdFrom && this.state.createdToValue !== this.props.createdTo ? () => {this.handleMenuValues('createdFromValue', ''); this.handleMenuValues('createdToValue', '');}   : null}
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
                                        <TextField
                                            id="dateFrom"
                                            style={{width:'9em'}}
                                            className={classes.textField}
                                            label="From"
                                            type="date"
                                            value={this.state.createdFromValue}
                                            onChange={(e) => this.handleMenuValues('createdFromValue',e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}/>
                                        <TextField
                                            id="dateTo"
                                            style={{width:'9em'}}
                                            label="To"
                                            type="date"
                                            value={this.state.createdToValue}
                                            onChange={(e) => this.handleMenuValues('createdToValue',e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}/>  
                                    </Grid>
                                    
                                      <Button size="small"  variant="contained" color="primary" className={classes.button} onClick={() => {this.handleFilterChange('createdFrom', 'createdTo', this.state.createdFromValue, this.state.createdToValue); popupState.close();}}>Filter</Button>
                                    </Grid>
                                    </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        </Grid>  
                    </TableCell>
                  <TableCell style={{width: '10%', fontWeight: 'bold', padding: '5px'}}>
                    <Grid container alignItems="center">
                      RECIPIENT
                      <PopupState variant="popover">
                        {popupState => (
                          <React.Fragment>
                            <IconButton className={classes.iconButton} {...bindTrigger(popupState)}>
                              <ArrowIcon fontSize="small"/>
                            </IconButton>
                            <Menu
                              {...bindMenu(popupState)}
                              onEnter={this.state.selectedRecipientOptions !== this.props.recipient ? () => this.handleMenuValues('recipientValue', []) : null}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                              getContentAnchorEl={null}
                              disableAutoFocusItem
                              PopoverClasses={{paper: classes.menuOverflow}}
                            >
                              <UserAutoFill
                                onChange={(selectedOptions) => this.setState({selectedRecipientOptions: selectedOptions})}
                                options={recipientOptions}
                                label={"Select recipients to filter by:"}
                                onFilter={() => {
                                  this.props.setParcelFilter('recipient', this.state.selectedRecipientOptions);
                                  popupState.close();
                                }}
                              />
                            </Menu>
                          </React.Fragment>
                        )}
                      </PopupState>
                    </Grid>
                  </TableCell>
                  <TableCell style={{width: '10%', fontWeight: 'bold', padding: '5px'}}>
                    <Grid container alignItems="center">
                      COURIER
                      <PopupState variant="popover">
                        {popupState => (
                          <React.Fragment>
                            <IconButton className={classes.iconButton} {...bindTrigger(popupState)}> <ArrowIcon
                              fontSize="small"/>
                            </IconButton>
                            <Menu
                              {...bindMenu(popupState)}
                              onEnter={this.state.selectedCourierOptions !== this.props.courier ? () => this.handleMenuValues('courierValue', []) : null}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                              getContentAnchorEl={null}
                              disableAutoFocusItem
                              PopoverClasses={{paper: classes.menuOverflow}}
                            >
                              <UserAutoFill
                                onChange={(selectedOptions) => this.setState({selectedCourierOptions: selectedOptions})}
                                options={courierOptions}
                                label={"Select couriers to filter by:"}
                                onFilter={() => {
                                  this.props.setParcelFilter('courier', this.state.selectedCourierOptions);
                                  popupState.close();
                                }}
                              />
                            </Menu>
                          </React.Fragment>
                        )}
                      </PopupState>
                    </Grid>
                  </TableCell>
                    <TableCell style={{width: '12%', fontWeight:'bold', padding: '12px'}}/>
                </TableRow>
                {(this.props.startLocation !== '' && this.props.endLocation !== '') || (this.props.weightFrom !== '' && this.props.weightTo !== '') ||(this.props.createdFrom !== '' && this.createdTo !== '') || this.props.recipient.length > 0 || this.props.courier.length > 0 || this.props.statusFilterCounter > 0
                    ?    <TableRow>
                            <TableCell colSpan={8}>  
                                <Grid container alignItems="center">
                                    <div style={{marginRight: '20px'}}>Filtered by:</div>
                                    { this.props.startLocation && this.props.endLocation ? <Chip key="destination" onDelete={() => this.handleFilterChange('startLocation', 'endLocation', '', '')} label={this.props.startLocation + ' - '+ this.props.endLocation} className={classes.chip} color="secondary" /> : null}
                                    { this.props.status.map((selected, index) => { 
                                        if(selected) return <Chip key={'status'+index+1} onDelete={() => this.props.setParcelFilter('status', index)} label={STATUS[index+1]} className={classes.chip} color="secondary" />;
                                        else return null}) }
                                    { this.props.weightFrom && this.props.weightTo ? <Chip key="weight" onDelete={() => this.handleFilterChange('weightFrom', 'weightTo', '', '')} label={this.props.weightFrom + ' kg - '+ this.props.weightTo + ' kg'} className={classes.chip}  color="secondary"/> : null}
                                    { this.props.createdFrom && this.props.createdTo ? <Chip key="created" onDelete={() => this.handleFilterChange('createdFrom', 'createdTo', '', '')} label={this.props.createdFrom + ' - '+ this.props.createdTo } className={classes.chip}  color="secondary"/> : null}
                                    { this.props.recipient.length > 0 && this.props.recipient.map((userOption, index) =>
                                      <Chip
                                        key={"recipient" + index}
                                        onDelete={() => this.props.setParcelFilter('recipient', this.props.recipient.filter(existingOption => existingOption.value !== userOption.value))}
                                        label={"Recipient: " + userOption.label}
                                        className={classes.chip}
                                        color="secondary"
                                      />
                                    )}
                                    { this.props.courier.length > 0 && this.props.courier.map((userOption, index) =>
                                      <Chip
                                        key={"courier" + index}
                                        onDelete={() => this.props.setParcelFilter('courier', this.props.courier.filter(existingOption => existingOption.value !== userOption.value))}
                                        label={"Courier: " + userOption.label}
                                        className={classes.chip}
                                        color="secondary"
                                      />
                                    )}
                                </Grid>
                            </TableCell>
                        </TableRow>
                    : null
                }

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
    recipient: state.parcels.recipient,
    courier: state.parcels.courier,
    currentUser: state.others.currentUser,
    allCouriers: state.parcels.allParcelCouriers,
    allRecipients: state.parcels.allParcelRecipients,
    statusFilterCounter: state.parcels.statusFilterCounter,
    locations: state.others.locations,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ParcelTableHeader));
