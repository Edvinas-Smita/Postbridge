import React from 'react';
import {connect} from 'react-redux';

import './ParcelList.css';

import Grid from '@material-ui/core/Grid/Grid';
import Table from '@material-ui/core/Table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Error from '@material-ui/icons/Error'
import {withStyles} from "@material-ui/core/styles";

import Header from '../../components/Header/Header';
import Decoration from '../../components/Decoration/Decoration';
import ParcelTable from '../../components/ParcelTable/ParcelTable';
import ParcelTableHeader from '../../components/ParcelTableHeader/ParcelTableHeader';
import ParcelStatus from '../../components/ParcelStatus/ParcelStatus';

import ParcelEdit from '../../components/ParcelEdit/ParcelEdit';

import {
  deleteParcel as deleteParcelAction,
  deleteParcelCancel,
  deleteParcelConfirm,
  getParcels as getParcelsAction,
  sortParcels
} from '../../state-management/actions/parcels';
import {
  openParcelStatus as openParcelStatusAction,
  updateParcelStatus as updateParcelStatusAction
} from '../../state-management/actions/parcel';
import {editParcelOpen as editParcelOpenAction} from "../../state-management/actions/parcelEdit";
import {getLocations as getLocationsAction} from '../../state-management/actions/others';
import {getSortedParcels} from '../../state-management/selectors/parcelsSelectors';

const styles = theme => ({
  roundedButton: {
    borderRadius: 24,
    marginLeft: theme.spacing.unit * 2
  },
  errorIcon: {
    height: 48,
    width: 48,
    fill: "orangered",
    position: 'absolute',
    left: '50%',
    marginLeft: -24
  },
  actionPadding: {
    paddingBottom: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    margin: 0
  },
});

class ParcelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: 'asc',
      sortBy: 'createdDate'
    };
    this.deleteParcelFactory = this.deleteParcelFactory.bind(this);
    this.deleteParcelConfirm = this.props.confirmDelete.bind(this);
    this.deleteParcelCancel = this.props.cancelDelete.bind(this);
    this.updateParcelStatusFactory = this.updateParcelStatusFactory.bind(this);
  }

  componentWillMount() {
    this.props.getParcels();
    this.props.getLocations();
  }

  componentWillReceiveProps(nextProps, nextContext) {
  }

  deleteParcelFactory(id) {
    return () => this.props.deleteParcel(id);
  }

  updateParcelStatusFactory(parcel) {
    this.props.updateParcelStatus(parcel);
  }

  handleRequestSort = (event, property) => {
    this.props.sortParcels(property);
  };

  openEditParcel(parcel) {
    this.props.editParcelOpen(parcel);
  }

  openParcelStatus(id) {
    this.props.openParcelStatus(id);
  }

  render() {
    return (
      <div className="ParcelListPage">
        <Header/>
        <Decoration onEditParcel={this.openEditParcel.bind(this)}/>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          className="ParcelTable"
        >
          <Table style={{width: '90%', marginLeft: '4%', marginRight: '4%', tableLayout: 'fixed',}}>
            <ParcelTableHeader
              onRequestSort={this.handleRequestSort}
              sortOrder={this.props.sortOrder}
              sortBy={this.props.sortBy}/>
            <ParcelTable
              deleteParcelFactory={this.deleteParcelFactory}
              parcels={this.props.parcels}
              user={this.props.user}
              onEditParcel={this.openEditParcel.bind(this)}
              openParcelStatus={this.openParcelStatus.bind(this)}
            />
          </Table>
        </Grid>
        <ParcelEdit/>
        <ParcelStatus
          updateParcelStatusFactory={this.updateParcelStatusFactory}/>

        />
        <Dialog
          open={this.props.deleteDialogOpen}
          onClose={this.deleteParcelCancel}
        >
          <DialogTitle>
            Are You sure You wish to delete this parcel?
          </DialogTitle>
          <DialogContent>
            This can not be undone
          </DialogContent>
          <DialogActions classes={{root: classes.actionPadding}}>
            {this.props.error &&
            <Tooltip title={"An error has occurred: " + this.props.error}>
              <Error
                className={classes.errorIcon}
              />
            </Tooltip>
            }
            <div style={{position: 'relative'}}>
              <Button
                variant="contained"
                className={classes.roundedButton}
                onClick={this.deleteParcelConfirm}
                disabled={this.props.isLoading || !!this.props.error}
              >
                Yes
              </Button>
              {this.props.isLoading &&
              <CircularProgress
                size={24}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-4px'
                }}
              />}
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.roundedButton}
              onClick={this.deleteParcelCancel}
              disabled={this.props.isLoading && !this.props.error}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getParcels: () => dispatch(getParcelsAction()),
  updateParcelStatus: (parcel) => dispatch(updateParcelStatusAction(parcel)),
  getLocations: () => dispatch(getLocationsAction()),
  deleteParcel: (id) => dispatch(deleteParcelAction(id)),
  confirmDelete: () => dispatch(deleteParcelConfirm()),
  cancelDelete: () => dispatch(deleteParcelCancel()),
  sortParcels: (sortBy) => dispatch(sortParcels(sortBy)),
  openParcelStatus: (id) => dispatch(openParcelStatusAction(id)),
  editParcelOpen: (parcel) => dispatch(editParcelOpenAction(parcel))
});

const mapStateToProps = state => ({
  isLoading: state.parcels.isLoading || state.others.isLoading || state.auth.isFetching,
  sortBy: state.parcels.sortBy,
  sortOrder: state.parcels.sortOrder,
  parcels: getSortedParcels(state),
  user: state.auth.user,
  deleteDialogOpen: !!state.parcels.parcelToDeleteID,
  error: state.parcels.error
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ParcelList));