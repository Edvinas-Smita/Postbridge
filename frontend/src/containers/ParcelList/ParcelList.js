import React from 'react';
import { connect } from 'react-redux';

import './ParcelList.css';

import Header from '../../components/Header/Header';
import Decoration from '../../components/Decoration/Decoration';
import ParcelTable from '../../components/ParcelTable/ParcelTable';
import Grid from '@material-ui/core/Grid/Grid';
import { getParcels as getParcelsAction, deleteParcel as deleteParcelAction, sortParcels } from '../../state-management/actions/parcels';
import { getSortedParcels } from '../../state-management/selectors/parcelsSelectors';
import ParcelEdit from '../../components/ParcelEdit/ParcelEdit';

class ParcelList extends React.Component {
    constructor(props){
        super(props);
        this.deleteParcelFactory = this.deleteParcelFactory.bind(this);
        this.state = {};
    }

    componentWillMount() {
        this.props.getParcels();
    }

    sortingFactory(sortBy) {
        return () => this.props.sortParcels(sortBy);
    }

    deleteParcelFactory(id) {
        return () => this.props.deleteParcel(id);
    }

    editParcel(parcel) {
        return () => {
            this.setState({
                editingParcel: true,
                parcelToEdit: parcel
            });
        }
    };

    finishEdit = parcel => {
        console.log("After edit parcel:", parcel === this.state.parcelToEdit || parcel == null ? " unchanged" : parcel);  //
        this.setState({
            editingParcel: false,
            parcelToEdit: null
        });
    };

    render() {
        return (
            <div className="ParcelListPage">
                <Header/>
                <Decoration/>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    className="ParcelTable"
                >
                    <ParcelTable
                        timeFilter={this.sortingFactory('createdDate')}
                        statusFilter={this.sortingFactory('status')}
                        weightFilter={this.sortingFactory('weight')}
                        deleteParcelFactory={this.deleteParcelFactory}
                        parcels={this.props.parcels}
                        userId={this.props.userId}
                        onEditParcel={this.editParcel}
                    />
                </Grid>
                <ParcelEdit
                    parcel={this.state.parcelToEdit}
                    open={this.state.editingParcel}
                    onClose={this.finishEdit}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getParcels: () => dispatch(getParcelsAction()),
    deleteParcel: (id) => dispatch(deleteParcelAction(id)),
    sortParcels: (sortBy) => dispatch(sortParcels(sortBy)),
});

const mapStateToProps = state => ({
    isLoading: state.parcels.isLoading,
    sortBy: state.parcels.sortBy,
    sortOrder: state.parcels.sortOrder,
    parcels: getSortedParcels(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ParcelList);