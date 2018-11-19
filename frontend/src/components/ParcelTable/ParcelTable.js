import React from 'react';

import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { setParcelFilter as setParcelFilterAction} from '../../state-management/actions/parcels';

import {formatWeight} from '../../helpers';
import { STATUS } from '../../helpers';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button/Button'
import Grid from '@material-ui/core/Grid/Grid';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';

import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import TextField from '@material-ui/core/TextField/TextField';

import PlaneIcon from '@material-ui/icons/AirplanemodeActive';
import PointIcon from '@material-ui/icons/Lens';
import CarIcon from '@material-ui/icons/DirectionsCar';
import ArrowIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SelectedIcon from '@material-ui/icons/Done';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';


const styles = theme => ({
      table: {
        width: '85%',
        marginLeft: '4%',
        marginRight: '4%',
        tableLayout: 'fixed',
      },
      tableRow: {
        borderColor: theme.palette.grey[300],
        border: '1.4px solid',
        height: '60px'
      },
      column: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        padding: '12px',
        backgroundColor: 'white',
        verticalAlign: 'middle'
      },
      greyTextColor: {
        color: theme.palette.grey[700],
      },
      boldText: {
        fontWeight: 'bold'
      },
      statusColumnBorder: {
        border: '1.5px dashed',
        justifyContent: 'center',
        borderRadius: '3px',
        height: '30px',
        width: '90px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center'
      },
      button: {
        height: '20px',
        borderRadius: '20px',
        width: '90px',
        fontSize: '12px',
        textTransform: 'none',
        marginRight: '10px'
      },
      pointIcon: {
        width: '10px',
        height: '10px',
        marginRight: '14px'
      },
      planeIcon: {
        transform: 'rotate(90deg)',
      },
      endLocationIcon: {
        color: theme.palette.grey[500],
        marginRight: '14px'
      },
      closeEditIcon: {
        width: '20px',
        height: '20px',
        color: theme.palette.grey[500],
        justifyContent: 'center',
        marginRight: '5px',
        verticalAlign: 'middle'
      },
      greyColor: {
        color: theme.palette.grey[500]
      },
      blueColor: {
        color: '#0F10A6'
      },
      greenColor: {
          color: '#22E52C'
      },
      iconButton: {
        padding: '7px'
      },
      menu: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      chip: {
        borderRadius: "5px",
        color: theme.palette.common.white,
        margin: theme.spacing.unit,
      },
      chips: {
        
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

  class ParcelTable extends React.Component {
    state = {
        
        
      };
    handleFilterChange = (filterBy1, filterBy2) => {
        this.props.setParcelFilter(filterBy1,'');
        this.props.setParcelFilter(filterBy2,'');
        console.log(this.props.parcels)
    };


    render() {
        const { classes } = this.props;
        const destinationColumnStyle = [classes.column, classes.boldText].join(' ');
        const otherColumnStyle = [classes.column, classes.greyTextColor].join(' ')       
        return (
            <Table className={classes.table}>
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
                            <TableSortLabel  onClick={this.props.statusFilter} style={{width: '42%'}}>
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
                            <TableSortLabel onClick={this.props.weightFilter} style={{width: '52%'}}>
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
                            <TableSortLabel onClick={this.props.timeFilter} style={{width: '62%'}}>
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

                </TableHead>
                <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                            { this.props.startLocation && this.props.endLocation ? <Chip key="destination" onDelete={() => this.handleFilterChange('startLocation', 'endLocation')} label={this.props.startLocation + '-'+ this.props.endLocation} className={classes.chip} color="secondary" /> : null}
                            { this.props.status.map((selected, index) => { if(selected) return <Chip key={'status'+index+1} onDelete={() => this.props.setParcelFilter('status', index)} label={STATUS[index+1]} className={classes.chip} color="secondary" /> })  }
                            { this.props.weightFrom && this.props.weightTo ? <Chip key="weight" onDelete={() => this.handleFilterChange('weightFrom', 'weightTo')} label={this.props.weightFrom + " kg" + '-'+ this.props.weightTo + " kg"} className={classes.chip}  color="secondary"/> : null}
                            { this.props.createdFrom && this.props.createdTo ? <Chip key="created" onDelete={() => this.handleFilterChange('createdFrom', 'createdTo')} label={this.props.createdFrom + '-'+ this.props.createdTo } className={classes.chip}  color="secondary"/> : null}
                            { this.props.courier  ? <Chip key="courier" onDelete={() => this.props.setParcelFilter('courier','')}label={this.props.courier } className={classes.chip} color="secondary"/> : null}
                        </div>

                <TableBody >
                {this.props.parcels.map((parcel, index) => {
                    let buttonText = "View details";
                    let buttonVariant = "outlined";
                    let buttonColor = "default";
                    let statusColumn;
                    let pointIcon;
                    let icon = <PlaneIcon className={[classes.planeIcon, classes.endLocationIcon].join(' ')}/>;
                    if (parcel.recipient.id === this.props.userId) {
                        buttonText = "I'll deliver";
                        buttonVariant = "contained";
                        buttonColor = "primary";
                    }
                    
                    if (STATUS[parcel.status] === 'Open') {
                        statusColumn = [classes.statusColumnBorder, classes.blueColor].join(' ');
                        pointIcon = [classes.pointIcon, classes.blueColor].join(' ');
                    }
                    else if (STATUS[parcel.status] === 'On the way') {
                        statusColumn = [classes.statusColumnBorder, classes.greenColor].join(' ');
                        pointIcon = [classes.pointIcon, classes.greenColor].join(' ');
                    }
                    else {
                        statusColumn = [classes.statusColumnBorder, classes.greyColor].join(' ');
                        pointIcon = [classes.pointIcon, classes.greyColor].join(' ');
                    }

                    if ((parcel.startLocation === 'Vilnius' && parcel.endLocation === 'Kaunas') || (parcel.startLocation === 'Kaunas' && parcel.endLocation === 'Vilnius')) {
                        icon = <CarIcon  className={classes.endLocationIcon}/>
                    }
                    return (
                    <TableRow className={classes.tableRow} key={index}>
                        <TableCell className={destinationColumnStyle} >
                            <PointIcon className={pointIcon}/>
                            {parcel.startLocation}
                        </TableCell>
                        <TableCell className={destinationColumnStyle} >
                            <Grid container alignItems="center">
                                {icon}
                                {parcel.endLocation}
                            </Grid> 
                        </TableCell>
                        <TableCell className={classes.column} ><div className={statusColumn}>{STATUS[parcel.status]}</div></TableCell>
                        <TableCell className={otherColumnStyle} >{parcel.description}</TableCell>
                        <TableCell className={otherColumnStyle} >{formatWeight(parcel.weight)}</TableCell>
                        <TableCell className={otherColumnStyle} >{parcel.createdDate.slice(0, 10)}</TableCell>
                        <TableCell className={otherColumnStyle} >
                        { (parcel.courier.id === this.props.userId)
                            ? "Me"
                            : parcel.courier.firstName + " " + parcel.courier.lastName + " "}
                        </TableCell>
                        <TableCell className={classes.column} > 
                            <Button variant={buttonVariant} color={buttonColor}  size="small" className={classes.button}>
                                {buttonText}
                            </Button>
                            { (STATUS[parcel.status] === 'Open' || STATUS[parcel.status] === 'Picked up')
                            ? <IconButton className={classes.iconButton}> <EditIcon fontSize="small"/> </IconButton>
                            : null }
                            { (STATUS[parcel.status] === 'Open')
                            ? <IconButton className={classes.iconButton} onClick={this.props.deleteParcelFactory(parcel.id)}> <CloseIcon fontSize="small"/> </IconButton> 
                            : null }
                        </TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>

            </Table>

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ParcelTable));
