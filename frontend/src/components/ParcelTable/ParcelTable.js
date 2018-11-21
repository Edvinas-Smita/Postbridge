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
import IconButton from '@material-ui/core/IconButton';

import PlaneIcon from '@material-ui/icons/AirplanemodeActive';
import PointIcon from '@material-ui/icons/Lens';
import CarIcon from '@material-ui/icons/DirectionsCar';
import ArrowIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

import { formatWeight } from '../../helpers';
import { STATUS } from '../../helpers';

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
        border: '1px dashed',
        justifyContent: 'center',
        borderRadius: '3px',
        height: '30px',
        width: '90px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold'
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
      primaryColor: {
        color: theme.palette.primary.dark
      },
      secondaryColor: {
          color: theme.palette.secondary.dark
      },
      iconButton: {
        padding: '7px'
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
                            <IconButton className={classes.iconButton}>
                                <ArrowIcon fontSize="small"/>
                            </IconButton> 
                        </Grid> 
                    </TableCell>
                    <TableCell style={{width: '7%', fontWeight:'bold', padding: '12px'}}></TableCell>
                    <TableCell style={{width: '8%', fontWeight:'bold', padding: '12px'}} >
                        <Grid container alignItems="center" >
                            <TableSortLabel onClick={props.statusFilter} style={{width: '42%'}}>
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
                            <TableSortLabel onClick={props.weightFilter} style={{width: '52%'}}>
                                WEIGHT
                            </TableSortLabel>
                            <IconButton className={classes.iconButton}>
                                <ArrowIcon fontSize="small"/>
                            </IconButton> 
                        </Grid>
                    </TableCell>
                    <TableCell style={{width: '7%', fontWeight:'bold', padding: '12px'}} >
                        <Grid container alignItems="center">
                            <TableSortLabel onClick={props.timeFilter} style={{width: '62%'}}>
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
                <TableBody >
                {props.parcels.map((parcel, index) => {
                    let buttonText = "View details";
                    let buttonVariant = "outlined";
                    let buttonColor = "default";
                    let statusColor;
                    switch(parcel.status)
                    {
                        case 1: 
                            statusColor = classes.primaryColor;
                            break;
                        case 2: 
                            statusColor = classes.secondaryColor;
                            break;
                        default: 
                            statusColor = classes.greyColor;
                    }
                    let statusColumn = [statusColor, classes.statusColumnBorder].join(' ');
                    let pointIcon = [statusColor, classes.pointIcon].join(' ');;
                    let icon = <PlaneIcon className={[classes.planeIcon, classes.endLocationIcon].join(' ')}/>;
                    if (parcel.recipient.id === props.userId) {
                        buttonText = "I'll deliver";
                        buttonVariant = "contained";
                        buttonColor = "primary";
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
                            { (parcel.courier.id === props.userId)
                            ? <IconButton className={classes.iconButton} onClick={props.onEditParcel(parcel)}> <EditIcon fontSize="small"/> </IconButton>
                            : null }
                            { (STATUS[parcel.status] === 'Open')
                            ? <IconButton className={classes.iconButton} onClick={props.deleteParcelFactory(parcel.id)}> <CloseIcon fontSize="small"/> </IconButton> 
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