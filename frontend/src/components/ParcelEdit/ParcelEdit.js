import React, {Component} from 'react';

import NumberFormat from 'react-number-format';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField/TextField';
import {withStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';

import {deepDiff, STATUS} from '../../helpers';
import Box from './Box.svg';
import {Typography} from '@material-ui/core';

import LocationSelect from '../../components/LocationSelect/LocationSelect';
import {connect} from "react-redux";
import {
  editParcelCloseDiscard,
  editParcelCloseEdit,
  editParcelCloseRequest,
  editParcelSaveEdit,
  editParcelSaveRequest
} from "../../state-management/actions/parcelEdit";

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
    gridTemplateColumns: '48% 48%',
    columnGap: '4%'
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
  },
  label: {
    fontWeight: 'bold',
    color: theme.palette.grey[600],
    marginBottom: theme.spacing.unit,
  },
  gridStatus: {
    marginTop: theme.spacing.unit,
  },
  statusButton: {
    justifyContent: 'center',
    borderRadius: '3px',
    height: '30px',
    width: '120px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    textTransform: 'none',
    pointerEvents: 'none',
    color: theme.palette.grey[500]
  },
  statusButtonNotActive: {
    border: '1px dashed',
    color: theme.palette.grey[500]
  },
  statusButtonActive: {
    border: 'none',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.dark
  }
});

function NumberFormatCustom(props) {
  const {inputRef, onChange, ...other} = props;

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
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      if (nextProps.parcel !== null) {
        this.setState({
          isRequestForm: false,
          parcel: nextProps.parcel,
          changesPending: false
        });
      } else {
        const emptyParcel = {
          startLocation: '',
          endLocation: '',
          status: 1,
          createdDate: new Date().toLocaleString("lt")
        };
        this.setState({
          isRequestForm: true,
          parcel: emptyParcel,
          changesPending: false
        });
      }
    }
  }

  handleChange(value, prop) {
    this.setState({
      parcel: {
        ...this.state.parcel,
        [prop]: value
      }
    });
  }

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
        weight: event.target.value === ''   //to not awkwardly force a zero when user tries to delete everything
          ? undefined
          : Number(event.target.value) * 1000
      }
    })
  };

  closeAndDiscard = () => {
    this.props.discardAny();
  };
  onCancelClick = () => {
    //discard changes   //TODO: should cancel instantly discard all changes or should it also ask for confirmation?
    this.closeAndDiscard();
  };

  changesPendingPrompt = () => {
    //if changed then open a confirmation dialog
    if (Object.keys(deepDiff(this.state.parcel, this.props.parcel)).length) {   //if there are changed values
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

  closeModal() {
    let parcel = this.state.parcel;
    if (!parcel.weight) {
      parcel.weight = 0;
    }
    if (!this.state.isRequestForm) {
      this.props.saveEdit(parcel);
      this.props.closeEdit();
    } else {
      this.props.saveRequest(parcel);
      this.props.closeRequest();
    }
  };

  onSaveClick = () => {
    //check if changes are valid?
    const {parcel} = this.state;
    if (!parcel.startLocation || !parcel.endLocation || !parcel.description) {
        this.setState({
          changesPending: false,
          startLocationError: !parcel.startLocation,
          endLocationError: !parcel.endLocation,
          descriptionError: !parcel.description
        });
        return;
    }

    //update parcel database in backend
    this.closeModal();
  };

  render() {
    if (!this.props.isOpen) {
      return null;
    }

    if (this.state.changesPending) {
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

    const {classes} = this.props;
    const {parcel, isRequestForm} = this.state;
    return (
      <Dialog
        open={this.props.isOpen === true}
        onBackdropClick={this.changesPendingPrompt}
        onEscapeKeyDown={this.changesPendingPrompt}
        scroll='body'
      >
        <DialogTitle>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img className={classes.icon} src={Box} alt=''/>
            <Typography variant="h5" style={{fontWeight: 'bold'}}>
              {isRequestForm ? 'Request new delivery' : 'Edit order'}
            </Typography>
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
              <div className={classes.toAndFrom}>
                <FormControl className={classes.fullWidth} error={this.state.startLocationError}>
                  <FormLabel className={classes.label} required>FROM</FormLabel>
                  <LocationSelect
                    value={parcel.startLocation}
                    onChange={this.handleChange}
                    name={'startLocation'}/>
                </FormControl>
                <FormControl className={classes.fullWidth} error={this.state.endLocationError}>
                  <FormLabel className={classes.label} required>TO</FormLabel>
                  <LocationSelect
                    value={parcel.endLocation}
                    onChange={this.handleChange}
                    name={'endLocation'}/>
                </FormControl>
              </div>
            </Grid>

            {!isRequestForm &&
            <Grid item className={classes.setWidth}>
              <FormLabel className={classes.label}>STATUS</FormLabel>
              <Grid
                container
                wrap='nowrap'
                spacing={8}
                justify="center"
                className={classes.gridStatus}
              >
                {Object.keys(STATUS).map(key => {
                  let statusStyle = [
                    classes.statusButton,
                    (this.props.parcel.status === Number(key))
                      ? classes.statusButtonActive
                      : classes.statusButtonNotActive
                  ].join(' ');
                  return (
                    <Grid item key={key} xs={3}>
                      <Button
                        variant='outlined'
                        className={statusStyle}
                      >
                        {STATUS[key]}
                      </Button>
                    </Grid>
                  );
                })
                }
              </Grid>
            </Grid>
            }

            <Grid item className={classes.setWidth}>
              <FormControl className={classes.fullWidth} error={this.state.descriptionError}>
                <FormLabel className={classes.label} required>DESCRIPTION</FormLabel>
                <TextField
                  variant="outlined"
                  multiline
                  rows="6"
                  InputProps={{className: classes.whiteField}}
                  value={parcel.description}
                  required
                  onChange={this.handleParcelChange('description')}
                  placeholder="Give a short description of what's in the package, if it's fragile, etc..."
                />
              </FormControl>
            </Grid>

            <Grid item className={classes.setWidth}>
              <FormControl className={classes.fullWidth}>
                <FormLabel className={classes.label}>PARCEL WEIGHT</FormLabel>
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
                    title="1 pound is ~0.454kg"
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
            style={{marginLeft: '12px'}}
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


const mapStateToProps = state => ({
  isLoading: state.parcelEdit.isLoading,
  isOpen: state.parcelEdit.isOpen,
  parcel: state.parcelEdit.parcel
});

const mapDispatchToProps = dispatch => ({
  saveEdit: (parcel) => dispatch(editParcelSaveEdit(parcel)),
  closeEdit: () => dispatch(editParcelCloseEdit()),
  saveRequest: (parcel) => dispatch(editParcelSaveRequest(parcel)),
  closeRequest: () => dispatch(editParcelCloseRequest()),
  discardAny: () => dispatch(editParcelCloseDiscard())
});

const styled = withStyles(styles)(ParcelEdit);

export default connect(mapStateToProps, mapDispatchToProps)(styled);
