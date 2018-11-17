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