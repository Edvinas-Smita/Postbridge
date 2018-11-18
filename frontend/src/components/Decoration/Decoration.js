import React, { Component } from 'react';
import  BackgroundImage from './background.png';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';

const styles = theme => ({
    main: {
        backgroundImage: 'url('+BackgroundImage+')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: "100%",
        height: "161px",
        position: "relative",
        paddingTop: "81px",
        display: "table"
    },
    titleContainer: {
        display: "table-row",
        verticalAlign: "middle",
    },
    tableCell: {
        verticalAlign: "middle",
        display: "table-cell",
        fontWeight: "bold",
        color: theme.palette.common.white,
    },
    tableCellLeft: {
        paddingLeft: "5%",
    },
    tableCellRight: {
        paddingRight: "5%",
        textAlign: "right"
    },
    button: {
        borderRadius: "20px",
        color: theme.palette.common.white,
        textTransform: "none",
        margin: theme.spacing.unit,
    },
    addCircle: {
        marginRight: theme.spacing.unit,
    }
});

class parcelListDeco extends Component {
    render() {
        const parcel = {
            id: '',
            recipient: {
                firstName: '',
                lastName: ''
            },
            startLocation: '',
            endLocation: '',
            status: 1,
            description: '',
            weight: ''
        }
        const { classes } = this.props;
        return (
            <div className={classes.main}>
                <div className={classes.titleContainer}>
                    <Typography variant="h5" className={[classes.tableCell,classes.tableCellLeft].join(' ')}>
                        Deliveries
                    </Typography>
                    <div className={[classes.tableCell,classes.tableCellRight].join(' ')}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={this.props.onEditParcel(parcel)}>
                            <AddCircle className={classes.addCircle}/>
                            Request new delivery
                        </Button>
                    </div>
                </div>
            </div>
        );    
    }
};

export default withStyles(styles)(parcelListDeco);