import React from 'react';
import { connect } from 'react-redux';

import './ParcelList.css';

import Grid from '@material-ui/core/Grid/Grid';

import Header from '../../components/Header/Header';
import Decoration from '../../components/Decoration/Decoration';
import ParcelTable from '../../components/ParcelTable/ParcelTable';
import ParcelStatusHistory from '../../containers/ParcelStatusHistory/ParcelStatusHistory';

import { getParcels as getParcelsAction, deleteParcel as deleteParcelAction, sortParcels } from '../../state-management/actions/parcels';
import { getParcelStatusHistory as getParcelStatusHistoryAction } from '../../state-management/actions/parcelStatusHistory';
import { getSortedParcels } from '../../state-management/selectors/parcelsSelectors';

class ParcelList extends React.Component {
    constructor(props){
        super(props);
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

    sortingFactory(sortBy) {
        return () => this.props.sortParcels(sortBy);
    }

    deleteParcelFactory(id) {
        return () => this.props.deleteParcel(id);
    }

    openParcelStatusHistory(id){
        this.setState(
            {
                isOpenHist: true,
            },
            () => {this.props.getParcelStatusHistory(id);});
    }

    closeParcelStatusHistory(id){
        this.setState(
            {
                isOpenHist: false,
            }
            );

    }

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
                        openParcelStatusHistory={this.openParcelStatusHistory}
                        parcels={this.props.parcels}
                        userId={this.props.userId} />
                </Grid>
                <ParcelStatusHistory 
                    open={this.state.isOpenHist} 
                    onRequestClose={this.closeParcelStatusHistory}
                    parcelStatusHistory={this.props.parcelStatusHistory}/>           
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
    /*parcelStatusHistory: getParcelStatusHistoryAction(),*/
});

export default connect(mapStateToProps, mapDispatchToProps)(ParcelList);