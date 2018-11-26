import React from 'react';
import { connect } from 'react-redux';

import './ParcelList.css';

import Grid from '@material-ui/core/Grid/Grid';
import Table from '@material-ui/core/Table';

import Header from '../../components/Header/Header';
import Decoration from '../../components/Decoration/Decoration';
import ParcelTable from '../../components/ParcelTable/ParcelTable';
import ParcelTableHeader from '../../components/ParcelTableHeader/ParcelTableHeader';
import ParcelStatusHistory from '../../containers/ParcelStatusHistory/ParcelStatusHistory';

import ParcelEdit from '../../components/ParcelEdit/ParcelEdit';

import { getParcels as getParcelsAction, deleteParcel as deleteParcelAction, sortParcels } from '../../state-management/actions/parcels';
import { getParcelStatusHistory as getParcelStatusHistoryAction } from '../../state-management/actions/parcelStatusHistory';
import { getSortedParcels } from '../../state-management/selectors/parcelsSelectors';

class ParcelList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sortOrder: 'asc',
            sortBy: 'createdDate'
        }
        this.deleteParcelFactory = this.deleteParcelFactory.bind(this);
        this.openParcelStatusHistory = this.openParcelStatusHistory.bind(this);
        this.closeParcelStatusHistory = this.closeParcelStatusHistory.bind(this);

        this.state = {
            isOpenHist: false
        }
    }

    componentWillMount() {
        this.props.getParcels();
    }

    deleteParcelFactory(id) {
        return () => this.props.deleteParcel(id);
    }

    handleRequestSort = (event, property) => {
        this.props.sortParcels(property);
    }
    
    openParcelStatusHistory(id){
        this.setState({
                isOpenHist: true,
            },
            () => {this.props.getParcelStatusHistory(id);});
    }

    closeParcelStatusHistory(id){
        this.setState({
                isOpenHist: false,
            });
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
            parcelToEdit: null
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
<<<<<<< HEAD
                            userId={this.props.userid}
=======
                            userId={this.props.userId}
>>>>>>> 60dec2f9fe061d7f74b6233862db84d2589af339
                            openParcelStatusHistory={this.openParcelStatusHistory}
                            onEditParcel={this.editParcel.bind(this)}

                            />
                    </Table>
                </Grid>
                <ParcelStatusHistory 
                    open={this.state.isOpenHist} 
                    onRequestClose={this.closeParcelStatusHistory}
                    parcelStatusHistory={this.props.parcelStatusHistory}
                    isHistoryLoading={this.props.isHistoryLoading}/>           
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
    getParcelStatusHistory: (id) => dispatch(getParcelStatusHistoryAction(id)),
});

const mapStateToProps = state => ({
    isLoading: state.parcels.isLoading,
    sortBy: state.parcels.sortBy,
    sortOrder: state.parcels.sortOrder,
    parcels: getSortedParcels(state),
    parcelStatusHistory: state.parcelStatusHistory.history,
    isHistoryLoading: state.parcelStatusHistory.isLoading,
    userid: state.parcels.userId
});

export default connect(mapStateToProps, mapDispatchToProps)(ParcelList);