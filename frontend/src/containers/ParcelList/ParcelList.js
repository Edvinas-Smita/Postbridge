import React from 'react';
import { connect } from 'react-redux';

import './ParcelList.css';

import Grid from '@material-ui/core/Grid/Grid';
import Table from '@material-ui/core/Table';

import Header from '../../components/Header/Header';
import Decoration from '../../components/Decoration/Decoration';
import ParcelTable from '../../components/ParcelTable/ParcelTable';
import ParcelTableHeader from '../../components/ParcelTableHeader/ParcelTableHeader';
import ParcelStatus from '../../components/ParcelStatus/ParcelStatus';

import ParcelEdit from '../../components/ParcelEdit/ParcelEdit';

import {
    deleteParcel as deleteParcelAction,
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


class ParcelList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sortOrder: 'asc',
            sortBy: 'createdDate'
        };
        this.deleteParcelFactory = this.deleteParcelFactory.bind(this);
        this.updateParcelStatusFactory = this.updateParcelStatusFactory.bind(this);
    }

    componentWillMount() {
        this.props.getParcels();
        this.props.getLocations();
    }

    deleteParcelFactory(id) {
        return () => this.props.deleteParcel(id);
    }

    updateParcelStatusFactory(parcel){
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
                            userId={this.props.userId}
                            onEditParcel={this.openEditParcel.bind(this)}
                            openParcelStatus={this.openParcelStatus.bind(this)}
                        />
                    </Table>
                </Grid>
                <ParcelEdit />
                <ParcelStatus
                    updateParcelStatusFactory={this.updateParcelStatusFactory}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getParcels: () => dispatch(getParcelsAction()),
    updateParcelStatus: (parcel) => dispatch(updateParcelStatusAction(parcel)),
    getLocations: () => dispatch(getLocationsAction()),
    deleteParcel: (id) => dispatch(deleteParcelAction(id)),
    sortParcels: (sortBy) => dispatch(sortParcels(sortBy)),
    openParcelStatus: (id) => dispatch(openParcelStatusAction(id)),
    editParcelOpen: (parcel) => dispatch(editParcelOpenAction(parcel))
});

const mapStateToProps = state => ({
    isLoading: state.parcels.isLoading,
    sortBy: state.parcels.sortBy,
    sortOrder: state.parcels.sortOrder,
    parcels: getSortedParcels(state),
    userId: state.parcels.userId,
});

export default connect(mapStateToProps, mapDispatchToProps)(ParcelList);