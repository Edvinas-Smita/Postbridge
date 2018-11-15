import React from 'react';

import { withStyles } from "@material-ui/core/styles";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button/Button'
import Grid from '@material-ui/core/Grid/Grid';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import PlaneIcon from '@material-ui/icons/AirplanemodeActive';
import PointIcon from '@material-ui/icons/Lens';
import CarIcon from '@material-ui/icons/DirectionsCar';
import ArrowIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

import {formatWeight} from '../../helpers';
import { STATUS } from '../../helpers';

const styles = theme => ({
      table: {
        width: '85%',
        marginLeft: '4%',
        marginRight: '4%',
        tableLayout: 'fixed',
      },
      tableRow: {
        borderColor: '#c7c2cc',
        borderStyle: 'solid',
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
        color: '#666666'
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
        color: '#959199',
        marginRight: '14px'
      },
      closeEditIcon: {
        width: '20px',
        height: '20px',
        color: '#959199',
        justifyContent: 'center',
        marginRight: '5px',
        verticalAlign: 'middle'
      },
      greyColor: {
        color: '#959199'
      },
      blueColor: {
        color: '#0F10A6'
      },
      greenColor: {
          color: '#22E52C'
      }

      
  });

const parcelTable = (props) => {
    const { classes } = props;
    const destinationColumnStyle = [classes.column, classes.boldText].join(' ');
    const otherColumnStyle = [classes.column, classes.greyTextColor].join(' ');
    return (

            <Table className={classes.table}>
                <TableHead >
                <TableRow style={{marginBottom: '10px'}}>
                    <TableCell style={{width: '7%', fontWeight:'bold', padding: '0px'}}>
                        <Grid container alignItems="center">
                            DESTINATION 
                            <ArrowIcon/>
                        </Grid> 
                    </TableCell>
                    <TableCell style={{width: '7%', fontWeight:'bold', padding: '12px'}}></TableCell>
                    <TableCell style={{width: '8%', fontWeight:'bold', padding: '12px'}} >
                        <TableSortLabel onClick={props.statusFilter} >
                            STATUS
                            <ArrowIcon/>
                        </TableSortLabel>
                    </TableCell>
                    <TableCell style={{width: '8%', fontWeight:'bold', padding: '12px'}}>
                        <Grid container alignItems="center">
                            DESCRIPTION
                        </Grid>
                   </TableCell>
                    <TableCell style={{width: '6%', fontWeight:'bold', padding: '12px'}} >
                        <TableSortLabel onClick={props.weightFilter} >
                            WEIGHT
                            <ArrowIcon/>
                        </TableSortLabel>
                    </TableCell>
                    <TableCell style={{width: '7%', fontWeight:'bold', padding: '12px'}} >
                        <TableSortLabel onClick={props.timeFilter} >
                            CREATED
                            <ArrowIcon/>
                        </TableSortLabel>   
                    </TableCell>
                    <TableCell style={{width: '9%', fontWeight:'bold', padding: '12px'}}>
                        <Grid container alignItems="center">
                        COURIER
                            <ArrowIcon/>
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '10%', fontWeight:'bold', padding: '12px'}}></TableCell>
                </TableRow>
                </TableHead>
                <TableBody >
                {props.parcels.map((parcel, index) => {
                    let buttonText = "View details";
                    let buttonVariant = "outlined";
                    let buttonColor = "default";
                    let statusColumn;
                    let pointIcon;
                    let icon = <PlaneIcon className={[classes.planeIcon, classes.endLocationIcon].join(' ')}/>;
                    if (parcel.recipient.id === props.userId) {
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

                    if ((parcel.startLocation === 'Vilnius' && parcel.endLocation === 'Kaunas') || 
                        (parcel.startLocation === 'Kaunas' && parcel.endLocation === 'Vilnius')) {
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
                        { (parcel.courier.id === props.userId)
                            ? "Me"
                            : parcel.courier.firstName + " " + parcel.courier.lastName }
                        </TableCell>
                        <TableCell className={classes.column} > 
                            <Button variant={buttonVariant} color={buttonColor} size="small" className={classes.button}
                                onClick={() => {props.openParcelStatusHistory(parcel.id)}}>
                                {buttonText}
                            </Button>
                            
                            { (STATUS[parcel.status] === 'Open' || STATUS[parcel.status] === 'Picked up')
                            ? <EditIcon className={classes.closeEditIcon}/>
                            : null }
                            { (STATUS[parcel.status] === 'Open')
                            ? <CloseIcon onClick={props.deleteParcelFactory(parcel.id)} className={classes.closeEditIcon}/>
                            : null }
                        </TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>

        )
}

export default withStyles(styles)(parcelTable);