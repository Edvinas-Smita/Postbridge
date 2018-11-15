import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { STATUS } from '../../helpers';

const styles = theme => ({
    root: {
        minHeight: "150px",
        alignItems: "center"
    }
})

class ParcelStatusHistory extends React.Component {
    render(){
        const { classes } = this.props;
        let rows = this.props.parcelStatusHistory || [];
        return (
            <Dialog 
                open={this.props.open} 
                onClose={() => this.props.onRequestClose()}
                PaperProps={{classes: {root:classes.root} }}>
                
                <DialogTitle>Parcel Status History</DialogTitle>
                {this.props.isHistoryLoading ? (
                    <CircularProgress/>) : (
                        <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>User Modified</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {this.props.isHistoryLoading === true && 
                            <CircularProgress/>
                            }
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
            </Dialog>
        );
    }
}

export default withStyles(styles)(ParcelStatusHistory);