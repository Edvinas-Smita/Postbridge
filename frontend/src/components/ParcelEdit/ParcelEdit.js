import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import './ParcelEdit.css'
import {STATUS, STATUS_COLORS} from '../../helpers'

const styles = theme => ({
    setWidth: {
        marginLeft: '2.5%',
        marginRight: '2.5%',
        width: '95%',
        padding: '8px'
    },
    whiteField: {
        backgroundColor: theme.palette.common.white,
        borderRadius: "4px"
    },
    fullWidth: {
        width: '100%',
        padding: '4px'
    }
});

class ParcelEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changesPending: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open && (!this.state.parcel || nextProps.parcel !== this.state.parcel)) {
            this.setState({
                parcel: nextProps.parcel,
                changesPending: false
            });
        }
    }

    handleParcelRecipientChange = prop => event => {    //for changing parcels' nested recipient properties
        this.setState({
            parcel: {
                ...this.state.parcel,
                recipient: {
                    ...this.state.parcel.recipient,
                    [prop]: event.target.value
                }
            }
        });
    };
    handleParcelChange = prop => event => {     //for changing not nested properties within parcel object
        this.setState({
            parcel: {
                ...this.state.parcel,
                [prop]: event.target.value
            }
        });
    };

    closeModal = () => {
        //return the resulting parcel after edit
        this.props.onClose(this.state.parcel);
    };
    closeAndDiscard = () => {
        this.props.onClose(null);   //or this.props.parcel instead of null to return the same object
    };

    changesPendingPrompt = () => {
        //if changed then open a confirmation dialog
        if (this.state.parcel !== this.props.parcel) {
            this.setState({
                changesPending: true
            });
        }
        else {
            this.closeAndDiscard();
        }
    };
    exitPendingPrompt = () => {
        //switch back to edit dialog
        this.setState({changesPending: false});
    };

    onCancelClick = () => {
        //discard changes   //TODO: should cancel instantly discard all changes or should it also ask for confirmation?
        this.closeAndDiscard();
    };
    onSaveClick = () => {
        //check if changes are valid?

        //update parcels
        this.closeModal();
    };

    render() {
        const {classes} = this.props;
        const isEmpty = !this.props.open || !this.state.parcel;
        const isConfirmation = this.props.open && this.state.changesPending;

        if (isEmpty) {
            return null;    //since there is nothing to render - don't render it
        }
        else if (isConfirmation) {
            return (
                <Dialog
                    open={true} //or open={isConfirmation} but it is already in an if
                    onBackdropClick={this.exitPendingPrompt}
                    onEscapeKeyDown={this.exitPendingPrompt}
                    scroll='body'
                >
                    <DialogTitle>Order has been changed</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are You sure You want to leave?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant='extendedFab'
                            color='secondary'
                            onClick={this.exitPendingPrompt}
                        >
                            No, continue editing
                        </Button>
                        <Button
                            variant='extendedFab'
                            onClick={this.closeAndDiscard}
                        >
                            Yes, discard changes
                        </Button>
                        <Button
                            variant='extendedFab'
                            color='primary'
                            onClick={this.onSaveClick}
                        >
                            Yes, save changes
                        </Button>
                    </DialogActions>
                </Dialog>
            )
        }

        return (
            <Dialog
                open={this.props.open === true}
                onBackdropClick={this.changesPendingPrompt}
                onEscapeKeyDown={this.changesPendingPrompt}
                scroll='body'
            >
                <DialogTitle>Edit order</DialogTitle>

                <DialogContent>
                    <Grid
                        container
                        spacing={16}
                        direction="column"
                        alignItems="center"
                        justify="flex-start"
                    >
                        <Grid item className={classes.setWidth}>
                            <FormControl className={classes.fullWidth}>
                                <FormLabel>FIRST NAME</FormLabel>
                                <TextField
                                    variant="outlined"
                                    placeholder="Enter recipients first name"
                                    inputProps={{className: classes.whiteField}}
                                    value={this.state.parcel.recipient.firstName}
                                    onChange={this.handleParcelRecipientChange('firstName')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item className={classes.setWidth}>
                            <FormControl className={classes.fullWidth}>
                                <FormLabel>LAST NAME</FormLabel>
                                <TextField
                                    variant="outlined"
                                    placeholder="Enter recipients last name"
                                    inputProps={{className: classes.whiteField}}
                                    value={this.state.parcel.recipient.lastName}
                                    onChange={this.handleParcelRecipientChange('lastName')}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item className={classes.setWidth}>
                            <div className="ToAndFrom">
                                <FormControl className={classes.fullWidth}>
                                    <FormLabel>FROM</FormLabel>
                                    <Select
                                        variant="outlined"
                                        value={this.state.parcel.startLocation}
                                        onChange={this.handleParcelChange('startLocation')}
                                    >
                                        <MenuItem
                                            value={this.state.parcel.startLocation}
                                        >
                                            {this.state.parcel.startLocation}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.fullWidth}>
                                    <FormLabel>TO</FormLabel>
                                    <Select
                                        variant="outlined"
                                        value={this.state.parcel.endLocation}
                                        onChange={this.handleParcelChange('endLocation')}
                                    >
                                        <MenuItem
                                            value={this.state.parcel.endLocation}
                                        >
                                            {this.state.parcel.endLocation}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>

                        <Grid item className={classes.setWidth}>
                            <FormLabel>STATUS</FormLabel>
                            <Grid
                                container
                                wrap='nowrap'
                                spacing={8}
                                justify="center"
                            >
                                {Object.keys(STATUS).map(key =>
                                    <Grid item key={key}>
                                        <Button value={key}
                                                disabled={true}
                                                /*onClick={() => this.setState({    //if we were to allow editing state from this form
                                                    parcel: {
                                                        ...this.state.parcel,
                                                        status: Number(key)
                                                    }
                                                })}*/
                                                variant='outlined'
                                                style={{
                                                    color: STATUS_COLORS[key] ? STATUS_COLORS[key] : 'Blue',    //TODO: probably use theme and set this from classes
                                                    borderColor: STATUS_COLORS[key] ? STATUS_COLORS[key] : 'Blue',
                                                    borderStyle: this.props.parcel.status === Number(key) ? 'solid' : 'dashed'  //the original state button gets a solid border //TODO: maybe something a bit more obvious?
                                                }}
                                        >
                                            {STATUS[key]}
                                        </Button>
                                    </Grid>)
                                }
                            </Grid>
                        </Grid>

                        <Grid item className={classes.setWidth}>
                            <FormControl className={classes.fullWidth}>
                                <FormLabel>DESCRIPTION</FormLabel>
                                <TextField
                                    variant="outlined"
                                    multiline
                                    rows="6"
                                    inputProps={{className: classes.whiteField}}
                                    value={this.state.parcel.description}
                                    onChange={this.handleParcelChange('description')}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item className={classes.setWidth}>
                            <FormControl className={classes.fullWidth}>
                                <FormLabel>PARCEL WEIGHT</FormLabel>
                                <TextField
                                    variant="outlined"
                                    inputProps={{className: classes.whiteField}}
                                    value={this.state.parcel.weight}
                                    onChange={this.handleParcelChange('weight')}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="extendedFab"
                        onClick={this.onCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="extendedFab"
                        color="primary"
                        onClick={this.onSaveClick}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ParcelEdit);