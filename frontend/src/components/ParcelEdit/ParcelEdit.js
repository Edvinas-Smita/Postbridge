import React, {Component} from 'react';
import NumberFormat from 'react-number-format';

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
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';

import {STATUS, deepDiff} from '../../helpers';
import Box from './Box.svg';

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
    },
    toAndFrom: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        columnGap: '12px'
    },
    weightAndInfo: {
        display: 'grid',
        gridTemplateColumns: '92% 8%',
        columnGap: '12px',
    },
    icon: {
        height: '32px',
        width: '32px',
        marginRight: '12px',
        marginLeft: '2.5%',
    }
});

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            decimalSeparator='.'
            decimalScale={3}
            isNumericString
            allowNegative={false}
            suffix='kg'
        />
    );
}

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
                parcel: {   //getting a custom copy to store only the information that is relevant in state
                    recipient: {
                        firstName: nextProps.parcel.recipient.firstName,
                        lastName: nextProps.parcel.recipient.lastName
                    },
                    startLocation: nextProps.parcel.startLocation,
                    endLocation: nextProps.parcel.endLocation,
                    status: nextProps.parcel.status,
                    description: nextProps.parcel.description,
                    weight: nextProps.parcel.weight
                },
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
    handleWeightChange = (event) => {
        this.setState({
            parcel: {
                ...this.state.parcel,
                weight: Number(event.target.value) * 1000
            }
        })
    };

    closeModal = () => {
        //return the fields that were changed after edit (for convenient UPDATE)
        this.props.onClose(deepDiff(this.state.parcel, this.props.parcel));
    };
    closeAndDiscard = () => {
        this.props.onClose({});   //return an empty object representing that no fields have been changed
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

        //update parcel database in backend
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
                    open={true} //or open={isConfirmation} but it is already inside of an if statement
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

        const {parcel} = this.state;
        return (
            <Dialog
                open={this.props.open === true}
                onBackdropClick={this.changesPendingPrompt}
                onEscapeKeyDown={this.changesPendingPrompt}
                scroll='body'
            >
                <DialogTitle>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img className={classes.icon} src={Box} alt=''/>
                        Edit order
                    </div>
                </DialogTitle>

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
                                <TextField  //TODO: possibly validate inputs as last line of defence from SQL injection
                                    variant="outlined"
                                    placeholder="Enter recipients first name"
                                    InputProps={{className: classes.whiteField}}
                                    value={parcel.recipient.firstName}
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
                                    InputProps={{className: classes.whiteField}}
                                    value={parcel.recipient.lastName}
                                    onChange={this.handleParcelRecipientChange('lastName')}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item className={classes.setWidth}>
                            <div className={classes.toAndFrom}>
                                <FormControl className={classes.fullWidth}>
                                    <FormLabel>FROM</FormLabel>
                                    <Select
                                        variant="outlined"
                                        value={parcel.startLocation}
                                        onChange={this.handleParcelChange('startLocation')}
                                    >
                                        <MenuItem
                                            value={parcel.startLocation}    //TODO: get list of locations from backend and map them to array of MenuItem
                                        >
                                            {parcel.startLocation}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.fullWidth}>
                                    <FormLabel>TO</FormLabel>
                                    <Select
                                        variant="outlined"
                                        value={parcel.endLocation}
                                        onChange={this.handleParcelChange('endLocation')}
                                    >
                                        <MenuItem
                                            value={parcel.endLocation}
                                        >
                                            {parcel.endLocation}
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
                                        <Button
                                            disabled={true}
                                            /*value={key}
                                            onClick={() => this.setState({    //if we were to allow editing state from this form
                                                parcel: {
                                                    ...parcel,
                                                    status: Number(key)
                                                }
                                            })}*/
                                            variant='outlined'
                                            style={this.props.parcel.status === Number(key)
                                                ? {
                                                    backgroundColor: '#00C770', //currently active button is highlighted green
                                                    borderWidth: '0',
                                                    color: 'white'
                                                } :
                                                {
                                                    borderStyle: 'dashed'
                                                }
                                            }
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
                                    InputProps={{className: classes.whiteField}}
                                    value={parcel.description}
                                    onChange={this.handleParcelChange('description')}
                                    placeholder="Give a short description of what's in the package, if it's fragile, etc..."
                                />
                            </FormControl>
                        </Grid>

                        <Grid item className={classes.setWidth}>
                            <FormControl className={classes.fullWidth}>
                                <FormLabel>PARCEL WEIGHT</FormLabel>
                                <div className={classes.weightAndInfo}>
                                    <TextField
                                        variant="outlined"
                                        value={Number(parcel.weight) / 1000}
                                        onChange={this.handleWeightChange}
                                        InputProps={{
                                            className: classes.whiteField,
                                            inputComponent: NumberFormatCustom
                                        }}
                                    />
                                    <Tooltip
                                        title="TODO tooltip text"
                                        enterTouchDelay={0}>
                                        <InfoOutlined
                                            color="disabled"
                                            style={{
                                                fontSize: '200%',
                                                position: 'relative',
                                                top: '12px'
                                            }}
                                        />
                                    </Tooltip>
                                </div>
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