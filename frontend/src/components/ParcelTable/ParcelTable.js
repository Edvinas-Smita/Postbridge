import React from 'react';

import { withStyles } from "@material-ui/core/styles";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button/Button'
import Grid from '@material-ui/core/Grid/Grid'

import PlaneIcon from '@material-ui/icons/AirplanemodeActive';
import PointIcon from '@material-ui/icons/Lens';
import CarIcon from '@material-ui/icons/DirectionsCar';
import EllipsisIcon from '@material-ui/icons/MoreHoriz';
import ArrowIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import {formatWeight} from '../../helpers';
import { STATUS } from '../../helpers';

const styles = theme => ({
      table: {
        width: '90%',
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
        padding: '3px',
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
        textTransform: 'none'
      },
      pointIcon: {
        width: '10px',
        height: '10px',
        marginRight: '10px'
      },
      planeIcon: {
        transform: 'rotate(90deg)',
      },
      endLocationIcon: {
        color: '#959199',
        marginRight: '10px'
      },
      ellipsisIcon: {
        width: '20px',
        height: '20px',
        color: '#959199',
        justifyContent: 'center',
        marginRight: '5px',
        verticalAlign: 'middle',
        marginLeft: '10px'
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
                <TableRow >
                    <TableCell style={{width: '8%', padding: '0px'}}>
                        <Grid container alignItems="center">
                            DESTINATION 
                            <ArrowIcon/>
                        </Grid> 
                    </TableCell>
                    <TableCell style={{width: '7%', padding: '3px'}}></TableCell>
                    <TableCell style={{width: '7%', padding: '3px'}} >
                        <TableSortLabel onClick={props.statusFilter} >
                            STATUS
                            <ArrowIcon/>
                        </TableSortLabel>
                    </TableCell>
                    <TableCell style={{width: '7%', padding: '3px'}}>
                        <Grid container alignItems="center">
                            DESCRIPTION
                        </Grid>
                   </TableCell>
                    <TableCell style={{width: '6%', padding: '3px'}} >
                        <TableSortLabel onClick={props.weightFilter} >
                            WEIGHT
                            <ArrowIcon/>
                        </TableSortLabel>
                    </TableCell>
                    <TableCell style={{width: '7%', padding: '3px'}} >
                        <TableSortLabel onClick={props.timeFilter} >
                            CREATED
                            <ArrowIcon/>
                        </TableSortLabel>   
                    </TableCell>
                    <TableCell style={{width: '7%', padding: '3px'}}>
                        <Grid container alignItems="center">
                            DELIVERED
                            <ArrowIcon/>
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '10%', padding: '3px'}}>
                        <Grid container alignItems="center">
                            RECIPIENT
                            <ArrowIcon/>
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '10%', padding: '3px'}}>
                        <Grid container alignItems="center">
                        COURIER
                            <ArrowIcon/>
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '10%', padding: '3px'}}></TableCell>
                </TableRow>
                </TableHead>
                <TableBody >
                {props.parcels.map((parcel, index) => {
                    let buttonText = "View details";
                    let buttonVariant = "outlined";
                    let buttonColor = "default";
                    let statusColor;
                    let pointIcon;
                    let icon = <PlaneIcon className={[classes.planeIcon, classes.endLocationIcon].join(' ')}/>;
                    if (parcel.recipient === 'me') {
                        buttonText = "I'll deliver";
                        buttonVariant = "contained";
                        buttonColor = "primary";
                    }
                    
                    if (STATUS[parcel.status] === 'Open') {
                        statusColor = '#0F10A6';
                    }
                    else if (STATUS[parcel.status] === 'On the way') {
                        statusColor = '#22E52C';
                    }
                    else {
                        statusColor = '#959199';
                    }

                    if (index.toString().split('').pop() === '0' || index.toString().split('').pop() === '4' || index.toString().split('').pop() === '5') {
                        pointIcon = [classes.pointIcon, classes.blueColor].join(' ');
                    }
                    else if(index.toString().split('').pop() === '1' || index.toString().split('').pop() === '6' ) {
                        pointIcon = [classes.pointIcon, classes.greyColor].join(' ');
                    }
                    else {
                        pointIcon = [classes.pointIcon, classes.greenColor].join(' ');
                    }


                    if (parcel.delivery === 'car') {
                        icon = <CarIcon  className={classes.endLocationIcon}/>
                    }

                    return (
                    <TableRow className={classes.tableRow} key={index}>
                        <TableCell className={destinationColumnStyle} >
                            <PointIcon className={pointIcon}/>
                            {parcel.fromPoint}
                        </TableCell>
                        <TableCell className={destinationColumnStyle} >
                            <Grid container alignItems="center">
                                {icon}
                                {parcel.toPoint}
                            </Grid> 
                        </TableCell>
                        <TableCell className={classes.column} ><div className={classes.statusColumnBorder} style={{borderColor: statusColor, color: statusColor}}>{STATUS[parcel.status]}</div></TableCell>
                        <TableCell className={otherColumnStyle} >{parcel.description}</TableCell>
                        <TableCell className={otherColumnStyle} >{formatWeight(parcel.weight)}</TableCell>
                        <TableCell className={otherColumnStyle} >{parcel.created.slice(0, 10)}</TableCell>
                        <TableCell className={otherColumnStyle} >{parcel.delivered}</TableCell>
                        <TableCell className={otherColumnStyle} >{parcel.recipient}</TableCell>
                        <TableCell className={otherColumnStyle} >{parcel.courier} </TableCell>
                        <TableCell className={classes.column} > 
                            <Button variant={buttonVariant} color={buttonColor}  size="small" mini="true" className={classes.button}>
                                {buttonText}
                            </Button>
                            <EllipsisIcon className={classes.ellipsisIcon}/>
                        </TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>

        )
}

export default withStyles(styles)(parcelTable);