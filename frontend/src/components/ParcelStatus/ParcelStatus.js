import React from 'react';
import {connect} from 'react-redux';

import {Dialog, DialogTitle} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';

import Button from '@material-ui/core/Button/Button';

import ArrowLeft from '@material-ui/icons/ArrowLeftSharp';
import ArrowRight from '@material-ui/icons/ArrowRightSharp';

import {STATUS} from '../../helpers';
import ParcelStatusHistory from '../../containers/ParcelStatusHistory/ParcelStatusHistory';

import {closeParcelStatus} from '../../state-management/actions/parcel';

const styles = theme => ({
    root: {
        width: "600px",
        height: "600px"
    },
    button: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        textTransform: 'none',
        borderRadius: '20px',
        backgroundColor: theme.palette.common.secondary

    },
    extendedIconLeft: {
        marginLeft: -theme.spacing.unit,
    },
    extendedIconRight: {
        marginRight: -theme.spacing.unit,
    },
    greyColor: {
        backgroundColor: theme.palette.grey[200]
    },
    buttonsArea: {
        marginLeft: theme.spacing.unit * 6,
    },
    historyArea: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,   
    },
    connectorActive: {
        '& $connectorLine': {
          borderColor: theme.palette.primary.main,
          borderStyle: "dashed",
          borderWidth: "0.5px"
        },
    },
    connectorCompleted: {
        '& $connectorLine': {
          borderColor: theme.palette.primary.main,
          borderStyle: "solid",
          borderWidth: "0.5px"
        },
    },
    connectorDisabled: {
        '& $connectorLine': {
          borderColor: theme.palette.grey[300],
          borderStyle: "solid",
          borderWidth: "0.5px"
        },
    },
    connectorLine: {
        transition: theme.transitions.create('border-color'),
    },
    stepLabelActive: {
       stroke: theme.palette.primary.dark,
       strokeWidth: "1" ,
       strokeDasharray: "2" ,
       '& text': {
           stroke: "none",
           fill: theme.palette.primary.main,
           fontWeight: "bold"
       },
       '& circle': {
           color: "white"
       }
    },
    stepLabelTextActive: {
        color: theme.palette.primary.main + "!important"
    }
})

class ParcelStatus extends  React.Component {

    handleStatusChange = (parcel, pos) => {
        parcel.status = parcel.status + pos;
        this.props.updateParcelStatusFactory(parcel);
    }

    handleClose = (parcel) => {
        this.props.closeParcelStatus(parcel);
    }
    
    render() {
        if (!this.props.open || !this.props.parcel){
            return null;
        }
        const activeStep  = this.props.parcel.status;
        const { classes } = this.props;
        const statusCount = Object.keys(STATUS).length; 
        const connector = (
            <StepConnector
              classes={{
                active: classes.connectorActive,
                completed: classes.connectorCompleted,
                disabled: classes.connectorDisabled,
                line: classes.connectorLine,
              }}
            />);
        return (
            <Dialog
                open={this.props.open}
                onClose={() => this.handleClose(this.props.parcel)}
                PaperProps={{
                    classes: {
                        root: classes.root
                        }
                    }}>
                <div>
                    <DialogTitle>Parcel Status</DialogTitle>
                    <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper} connector={connector}>
                        {Object.keys(STATUS).map((index) => {
                            return (
                                <Step key={index}>
                                    <StepLabel
                                        classes={{
                                            active:classes.stepLabelTextActive
                                        }}
                                        StepIconProps={{ 
                                            classes: { 
                                                active: classes.stepLabelActive,
                                                completed: classes.stepLabelCompleted
                                            } 
                                        }}>
                                        {STATUS[index]}
                                    </StepLabel>
                                </Step>
                                );
                            })
                        }
                    </Stepper>
                </div>
                {
                  (
                    (!this.props.parcel.courier || this.props.parcel.courier.id === this.props.user.id) &&
                    (this.props.parcel.recipient && this.props.parcel.recipient.id !== this.props.user.id)
                  ) &&
                <div className={classes.buttonsArea}>
                    {activeStep > 1 &&
                        <Button
                            variant="contained"
                            onClick={() => this.handleStatusChange(this.props.parcel, - 1)}
                            className={[classes.button, classes.greyColor].join(' ')}
                            disabled={this.props.isLoading}
                            >
                            <ArrowLeft className={classes.extendedIconLeft} />
                            Move back to {STATUS[activeStep - 1]}
                        </Button>
                    }
                    {activeStep < statusCount &&
                        <Button
                            variant="contained"
                            onClick={() => this.handleStatusChange(this.props.parcel, 1)}
                            className={classes.button}
                            color="primary"
                            disabled={this.props.isLoading}
                            >
                            Set to {STATUS[activeStep + 1]}
                            <ArrowRight className={classes.extendedIconRight} />
                        </Button>
                    }
                </div>
                }
                <div className={classes.historyArea}>
                    <ParcelStatusHistory 
                        parcelStatusHistory={this.props.parcelStatusHistory}/>
                </div>
            </Dialog>     
        );
    }
}

const mapStateToProps = state => ({
    open: state.parcel.isStatusOpen,
    parcel: state.parcel.parcel,
    user: state.auth.user,
    isLoading: state.parcel.isLoading,
    parcelStatusHistory: state.parcel.statusHistory
})

const mapDispatchToProps = dispatch => ({
    closeParcelStatus: (parcel) => dispatch(closeParcelStatus(parcel))
});

const ParcelStatusSytled = withStyles(styles)(ParcelStatus);

export default connect(mapStateToProps, mapDispatchToProps)(ParcelStatusSytled);