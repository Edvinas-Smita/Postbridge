import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { setParcelFilter as setParcelFilterAction} from '../../state-management/actions/parcels';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid/Grid';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import ArrowIcon from '@material-ui/icons/ArrowDropDown';

import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import TextField from '@material-ui/core/TextField/TextField';
import SelectedIcon from '@material-ui/icons/Done';
import ListItemText from '@material-ui/core/ListItemText';
import PlaneIcon from '@material-ui/icons/AirplanemodeActive';

import Chip from '@material-ui/core/Chip';
import { STATUS } from '../../helpers';



const styles = theme => ({
    iconButton: {
      padding: '7px'
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

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    }

    handleFilterChange = (filterBy1, filterBy2) => {
        this.props.setParcelFilter(filterBy1,'');
        this.props.setParcelFilter(filterBy2,'');
    };

    render () {
        const { classes } = this.props;
        return (
            <TableHead >
                <TableRow style={{marginBottom: '10px'}}>
                <TableCell style={{width: '7%', fontWeight:'bold', padding: '0px'}}>
                        <Grid container alignItems="center">
                            DESTINATION 
                            <PopupState variant="popover" popupId="demo-popup-menu" state={{width: '200px'}}>
                                {popupState => (
                                    <React.Fragment>
                                    <IconButton className={classes.iconButton} {...bindTrigger(popupState)}> <ArrowIcon fontSize="small"/> </IconButton>  
                                    <Menu {...bindMenu(popupState)} >
                                    <Grid container direction="column">
                                        <Grid container direction="row">
                                            <Select 
                                                style={{width: '100px'}}
                                                value={this.props.startLocation}
                                                onChange={(e) => this.props.setParcelFilter('startLocation', e.target.value)}
                                                MenuProps={MenuProps}
                                            >
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                <MenuItem value='Vilnius'>Vilnius</MenuItem>
                                                <MenuItem value='Kaunas'>Kaunas</MenuItem>
                                                <MenuItem value='Toronto'>London</MenuItem>
                                                <MenuItem value='Toronto'>Toronto</MenuItem>
                                                <MenuItem value='Toronto'>Chicago</MenuItem>
                                            </Select>
       
                                        <PlaneIcon className={ [classes.planeIcon, classes.blueColor].join(' ')    }/>
                                        <Select 
                                        style={{width: '100px'}}
                                                value={this.props.endLocation}
                                                onChange={(e) => this.props.setParcelFilter('endLocation', e.target.value)}
                                                MenuProps={MenuProps}
                                            >
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                <MenuItem value='Vilnius'>Vilnius</MenuItem>
                                                <MenuItem value='Kaunas'>Kaunas</MenuItem>
                                                <MenuItem value='Toronto'>London</MenuItem>
                                                <MenuItem value='Toronto'>Toronto</MenuItem>
                                                <MenuItem value='Toronto'>Chicago</MenuItem>
                                            </Select>
                                            </Grid>
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
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {popupState => (
                                    <React.Fragment>
                                    <IconButton className={classes.iconButton} {...bindTrigger(popupState)}> <ArrowIcon fontSize="small"/> </IconButton>  
                                    <Menu {...bindMenu(popupState)}>
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
                            <PopupState variant="popover" popupId="demo-popup-menu" >
                                {popupState => (
                                    <React.Fragment>
                                    <IconButton className={classes.iconButton} {...bindTrigger(popupState)}> <ArrowIcon fontSize="small"/> </IconButton>  
                                    <Menu {...bindMenu(popupState)} >
                                    <Grid>
  
                                    <TextField
                                    id='weightFrom'
                                    value={this.props.weightFrom}
                                    label="From"
                                    onChange={(e) => this.props.setParcelFilter('weightFrom',e.target.value)}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                    />
                                    <TextField
                                    id='weightTo'
                                  
                                    label="To"
                                    value={this.props.weightTo}
                                    onChange={(e) => this.props.setParcelFilter('weightTo',e.target.value)}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                    />
                                    </Grid>
                                    </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                            
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
                            <PopupState variant="popover" popupId="demo-popup-menu" >
                                {popupState => (
                                    <React.Fragment>
                                    <IconButton className={classes.iconButton} {...bindTrigger(popupState)}> <ArrowIcon fontSize="small"/> </IconButton>  
                                    <Menu {...bindMenu(popupState)}  >
                                    <Grid>
  
                                    <TextField
                                        id="dateFron"
                                        label="From"
                                        type="date"
                                        value={this.props.createdFrom}
                                        onChange={(e) => this.props.setParcelFilter('createdFrom',e.target.value)}
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}/>
                                        <TextField
                                        id="dateTo"
                                        label="To"
                                        type="date"
                                        value={this.props.createdTo}
                                        onChange={(e) => this.props.setParcelFilter('createdTo',e.target.value)}
                                        className={classes.textField}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    </Grid>
                                    </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>

                        </Grid>  
                    </TableCell>
                    <TableCell style={{width: '9%', fontWeight:'bold', padding: '12px'}}>
                        <Grid container alignItems="center">
                            COURIER
                            <PopupState variant="popover" popupId="demo-popup-menu" >
                                {popupState => (
                                    <React.Fragment>
                                    <IconButton className={classes.iconButton} {...bindTrigger(popupState)}> <ArrowIcon fontSize="small"/> </IconButton>  
                                    <Menu {...bindMenu(popupState)} >
                                    <Grid>
  
                                    <TextField 
                                    label="Courier"
                                    value={this.props.courier} 
                                    onChange={(e) => this.props.setParcelFilter('courier',e.target.value)}/>    
                                    </Grid>
                                    </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '12%', fontWeight:'bold', padding: '12px'}}></TableCell>
                </TableRow>
                <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                            { this.props.startLocation && this.props.endLocation ? <Chip key="destination" onDelete={() => this.handleFilterChange('startLocation', 'endLocation')} label={this.props.startLocation + '-'+ this.props.endLocation} className={classes.chip} color="secondary" /> : null}
                            { this.props.status.map((selected, index) => { if(selected) return <Chip key={'status'+index+1} onDelete={() => this.props.setParcelFilter('status', index)} label={STATUS[index+1]} className={classes.chip} color="secondary" /> })  }
                            { this.props.weightFrom && this.props.weightTo ? <Chip key="weight" onDelete={() => this.handleFilterChange('weightFrom', 'weightTo')} label={this.props.weightFrom + " kg" + '-'+ this.props.weightTo + " kg"} className={classes.chip}  color="secondary"/> : null}
                            { this.props.createdFrom && this.props.createdTo ? <Chip key="created" onDelete={() => this.handleFilterChange('createdFrom', 'createdTo')} label={this.props.createdFrom + '-'+ this.props.createdTo } className={classes.chip}  color="secondary"/> : null}
                            { this.props.courier  ? <Chip key="courier" onDelete={() => this.props.setParcelFilter('courier','')}label={this.props.courier } className={classes.chip} color="secondary"/> : null}
                        </div>

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
    userId: state.parcels.userId
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ParcelTableHeader));
