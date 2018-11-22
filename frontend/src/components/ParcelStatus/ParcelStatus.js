import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button/Button';

import ArrowLeft from '@material-ui/icons/ArrowLeftSharp';
import ArrowRight from '@material-ui/icons/ArrowRightSharp';

import { STATUS } from '../../helpers';

const styles = theme => ({
    root: {
        minHeight: "150px",
        minWidth: "600px",
        width: '90%',
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
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    greyColor: {
        backgroundColor: theme.palette.grey[300]
    }
})

class ParcelStatus extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            activeStep: 0
        }
    }

    componentWillReceiveProps(props) {
        this.setState({activeStep: props.parcel.status});
    }

    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });
    }

    handlePrev = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    }

    render(){
        const { classes } = this.props;
        const { activeStep } = this.state;
        const statusCount = Object.keys(STATUS).length; 

        return (
            <Dialog
                open={this.props.open} 
                onClose={() => this.props.onRequestClose()}
                PaperProps={{classes: {root:classes.root} }}>
                <DialogTitle>Parcel Status</DialogTitle>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {Object.keys(STATUS).map((index) => {
                        return (
                            <Step key={index}>
                                <StepLabel>{STATUS[index]}</StepLabel>
                            </Step>
                            );
                        })
                    }
                </Stepper>
                <div>
                    {activeStep > 1 &&
                        <Button
                            variant="contained"
                            onClick={this.handlePrev}
                            className={[classes.button, classes.greyColor].join(' ')}
                            >
                            <ArrowLeft className={classes.extendedIcon} />
                            {STATUS[activeStep - 1]}
                            
                        </Button>
                    }
                    {activeStep < statusCount &&
                        <Button
                            variant="contained"
                            onClick={this.handleNext}
                            className={classes.button}
                            color="primary"
                            >
                            {STATUS[activeStep + 1]}
                            <ArrowRight className={classes.extendedIcon} />
                        </Button>
                    }
                </div>

            </Dialog>

        );
    }
}

export default withStyles(styles)(ParcelStatus);