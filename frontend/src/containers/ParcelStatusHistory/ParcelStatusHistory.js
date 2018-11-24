import React, { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";

import { Typography } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { STATUS } from '../../helpers';

const styles = theme => ({
    root: {
        marginLeft: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 6,
    }
})

class ParcelStatusHistory extends React.Component {
    
    render(){
        const { classes } = this.props;
        let rows = this.props.parcelStatusHistory || [];
        return(
            <Fragment>
                <Typography variant="h6" className={classes.header}>Status History</Typography>

                    {this.props.isHistoryLoading ? (
                        <CircularProgress/> 
                    ): (
                        <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>User Modified</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.user.firstName + " " + row.user.lastName}</TableCell>
                                        <TableCell>{STATUS[row.status]}</TableCell>
                                    </TableRow>)
                            })}

                        </TableBody>
                    </Table>
                    )}
            </Fragment>
        );
    }
}

export default withStyles(styles)(ParcelStatusHistory);
