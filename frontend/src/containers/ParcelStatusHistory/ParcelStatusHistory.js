import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class ParcelStatusHistory extends React.Component {
    constructor(props){
        super(props);
    }

    handleClose = () => {
      };

    render(){
        return (
            <Dialog open={this.props.open} onClose={() => this.props.onRequestClose()}>
                <DialogTitle>Parcel Status History</DialogTitle>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>User Modified</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>2018-07-10</TableCell>
                            <TableCell>Albert</TableCell>
                            <TableCell>Open</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2018-07-12</TableCell>
                            <TableCell>John</TableCell>
                            <TableCell>Picked Up</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Dialog>
        );
    }
}

export default ParcelStatusHistory;