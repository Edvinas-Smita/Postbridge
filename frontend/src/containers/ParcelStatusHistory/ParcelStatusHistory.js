import React, { Fragment } from 'react';

import { Typography } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { STATUS } from '../../helpers';


class ParcelStatusHistory extends React.Component {
    
    render(){
        let rows = this.props.parcelStatusHistory || [];
        return(
            <Fragment>
                <Typography variant="h6">Status History</Typography>
                    <Table>
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
            </Fragment>
        );
    }
}

export default ParcelStatusHistory;
