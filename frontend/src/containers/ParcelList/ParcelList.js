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
    getParcels as getParcelsAction, 
    sortParcels,
    deleteParcel as deleteParcelAction} from '../../state-management/actions/parcels';
import {
    updateParcelStatus as updateParcelStatusAction,
    openParcelStatus as openParcelStatusAction} from '../../state-management/actions/parcel';
import { getSortedParcels } from '../../state-management/selectors/parcelsSelectors';



class ParcelList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sortOrder: 'asc',
            sortBy: 'createdDate',
            isOpenHist: false,
            parcelToEdit: {},
            parcel: {}
        }
        this.deleteParcelFactory = this.deleteParcelFactory.bind(this);
        this.updateParcelFactory = this.updateParcelFactory.bind(this);
    }

    componentWillMount() {
        this.props.getParcels();
    }

    deleteParcelFactory(id) {
        return () => this.props.deleteParcel(id);
    }

    updateParcelFactory(parcel){
        this.props.updateParcelStatus(parcel);
    }

    handleRequestSort = (event, property) => {
        this.props.sortParcels(property);
    }
    
    openParcelStatus(id) {
        this.props.openParcelStatus(id);
    }

    editParcel(parcel) {
        return () => {
            this.setState({
                editingParcel: true,
                parcelToEdit: parcel
            });
        }
    };

    finishEdit = newValues => {
        console.log("Changed values:", newValues);
        this.setState({
            editingParcel: false,
            parcelToEdit: []
        });
    };

    render() {
        return (       
            <div className="ParcelListPage">
                <Header/>
                <Decoration onEditParcel={this.editParcel.bind(this)}/> 
                <Grid               
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    className="ParcelTable"
                >
                    <Table style={{width: '85%', marginLeft: '4%', marginRight: '4%', tableLayout: 'fixed',}}>
                        <ParcelTableHeader 
                            onRequestSort={this.handleRequestSort}
                            sortOrder={this.props.sortOrder}
                            sortBy={this.props.sortBy}/>
                        <ParcelTable
                            deleteParcelFactory={this.deleteParcelFactory}
                            parcels={this.props.parcels}
                            userId={this.props.userId}
                            onEditParcel={this.editParcel.bind(this)}
                            openParcelStatus={this.openParcelStatus.bind(this)}
                            />
                    </Table>
                </Grid>
                <ParcelEdit
                    parcel={this.state.parcelToEdit}
                    open={this.state.editingParcel}
                    onClose={this.finishEdit}
                />
                <ParcelStatus
                    open={this.state.isOpenStatus} 
                    parcelId={this.state.parcelId}
                    updateParcelFactory={this.updateParcelFactory}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getParcels: () => dispatch(getParcelsAction()),
    updateParcelStatus: (parcel) => dispatch(updateParcelStatusAction(parcel)),
    deleteParcel: (id) => dispatch(deleteParcelAction(id)),
    sortParcels: (sortBy) => dispatch(sortParcels(sortBy)),
    openParcelStatus: (id) => dispatch(openParcelStatusAction(id))
});

const mapStateToProps = state => ({
    isLoading: state.parcels.isLoading,
    sortBy: state.parcels.sortBy,
    sortOrder: state.parcels.sortOrder,
    parcels: getSortedParcels(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ParcelList);