import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';

import Button from '@material-ui/core/Button/Button';

import ArrowLeft from '@material-ui/icons/ArrowLeftSharp';
import ArrowRight from '@material-ui/icons/ArrowRightSharp';

import { STATUS } from '../../helpers';
import ParcelStatusHistory from '../../containers/ParcelStatusHistory/ParcelStatusHistory';

const styles = theme => ({
    root: {
        minHeight: "150px",
        width: '100%'
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

class ParcelStatus extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            activeStep: null,
            parcelStatusHistory: this.props.parcelStatusHistory
        }
    }

    componentWillReceiveProps(props) {
        this.setState({activeStep: props.parcel.status});
        this.setState({parcelStatusHistory: props.parcelStatusHistory})
    }

    handleStatusChange = (pos) => {
        const { activeStep } = this.state;
        let parcel = this.props.parcel;
        parcel.status = activeStep + pos;
        this.props.updateParcelFactory(parcel);
        console.log("finished"); 
    }

    render(){
        const { classes } = this.props;
        const { activeStep } = this.state;
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
                onClose={() => this.props.onRequestClose()}
                PaperProps={{classes: {root:classes.root} }}>
                <DialogTitle>Parcel Status</DialogTitle>
                <div>
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
                <div className={classes.buttonsArea}>
                    {activeStep > 1 &&
                        <Button
                            variant="contained"
                            onClick={() => this.handleStatusChange(-1)}
                            className={[classes.button, classes.greyColor].join(' ')}
                            >
                            <ArrowLeft className={classes.extendedIconLeft} />
                            Move back to {STATUS[activeStep - 1]}
                            
                        </Button>
                    }
                    {activeStep < statusCount &&
                        <Button
                            variant="contained"
                            onClick={() => this.handleStatusChange(1)}
                            className={classes.button}
                            color="primary"
                            >
                            Set to {STATUS[activeStep + 1]}
                            <ArrowRight className={classes.extendedIconRight} />
                        </Button>
                    }
                </div>
                
                <div className={classes.historyArea}>
                    <ParcelStatusHistory 
                        isHistoryLoading={this.props.isHistoryLoading}
                        parcelStatusHistory={this.state.parcelStatusHistory}/>
                </div>
            </Dialog>

        );
    }
}

export default withStyles(styles)(ParcelStatus);