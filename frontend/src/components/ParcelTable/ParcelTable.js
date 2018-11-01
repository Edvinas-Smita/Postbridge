import React from 'react';

import { withStyles } from "@material-ui/core/styles";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button/Button'
import Grid from '@material-ui/core/Grid/Grid'


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
        padding: '10px',
        backgroundColor: 'white',
        verticalAlign: 'middle'
      },
      greyTextColor: {
        color: '#666666'
      },
      statusColumn: {
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
      }

      
  });

const parcelTable = (props) => {
    const { classes } = props;
    return (

            <Table className={classes.table}>
                <TableHead >
                <TableRow >
                    <TableCell style={{width: '7%', padding: '0px'}}>DESTINATION</TableCell>
                    <TableCell style={{width: '9%', padding: '10px'}}></TableCell>
                    <TableCell style={{width: '7%', padding: '10px'}} onClick={props.statusFilter} >STATUS</TableCell>
                    <TableCell style={{width: '7%', padding: '10px'}}>DESCRIPTION</TableCell>
                    <TableCell style={{width: '6%', padding: '10px'}} onClick={props.weightFilter}>WEIGHT</TableCell>
                    <TableCell style={{width: '6%', padding: '10px'}} onClick={props.timeFilter}>CREATED</TableCell>
                    <TableCell style={{width: '6%', padding: '10px'}}>DELIVERED</TableCell>
                    <TableCell style={{width: '10%', padding: '10px'}}>RECIPIENT</TableCell>
                    <TableCell style={{width: '10%', padding: '10px'}}>COURIER</TableCell>
                    <TableCell style={{width: '10%', padding: '10px'}}></TableCell>
                </TableRow>
                </TableHead>
                <TableBody >
                {props.parcels.map((parcel, index) => {
                    let buttonText = "View details";
                    let buttonVariant = "outlined";
                    let buttonColor = "default";
                    let statusColor;
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
                    return (
                    <TableRow className={classes.tableRow} key={index}>
                        <TableCell className={classes.column} style={{fontWeight: 'bold'}} >{parcel.fromPoint}</TableCell>
                        <TableCell className={classes.column} style={{fontWeight: 'bold'}}><Grid container direction="row" alignItems="center">{parcel.toPoint}</Grid>  </TableCell>
                        <TableCell className={classes.column} ><div className={classes.statusColumn} style={{borderColor: statusColor, color: statusColor}}>{STATUS[parcel.status]}</div></TableCell>
                        <TableCell className={classes.column} style={{color: '#666666'}}>{parcel.description}</TableCell>
                        <TableCell className={classes.column} style={{color: '#666666'}}>{formatWeight(parcel.weight)}</TableCell>
                        <TableCell className={classes.column} style={{color: '#666666'}}>{parcel.created.slice(0, 10)}</TableCell>
                        <TableCell className={classes.column} style={{color: '#666666'}}>{parcel.delivered}</TableCell>
                        <TableCell className={classes.column} style={{color: '#666666'}}>{parcel.recipient}</TableCell>
                        <TableCell className={classes.column} style={{color: '#666666'}}>{parcel.courier} </TableCell>
                        <TableCell className={classes.column} > <Button variant={buttonVariant} color={buttonColor}  size="small" mini="true" className={classes.button}>{buttonText}</Button></TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>

        )
}

export default withStyles(styles)(parcelTable);