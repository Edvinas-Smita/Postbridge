import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid/Grid';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import ArrowIcon from '@material-ui/icons/ArrowDropDown';


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
    }
});

class ParcelTableHeader extends Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    }

    render () {
        const { classes } = this.props;
        return (
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

export default withStyles(styles)(ParcelTableHeader);