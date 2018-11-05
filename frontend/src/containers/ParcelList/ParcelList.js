import React from 'react';
import { connect } from 'react-redux';

import './ParcelList.css';


import Header from '../../components/Header/Header';
import Decoration from '../../components/Decoration/Decoration';
import { getParcels as getParcelsAction, sortParcels } from '../../state-management/actions/parcels';
import { getSortedParcels } from '../../state-management/selectors/parcelsSelectors'

class ParcelList extends React.Component {
    componentWillMount() {
        this.props.getParcels();
    }

    sortingFactory(sortBy) {
        return () => this.props.sortParcels(sortBy);
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
                    <ParcelTable  timeFilter={this.sortByTime} statusFilter={this.sortByStatus} weightFilter={this.sortByWeight} parcels={this.state.filteredParcels}/>
                </Grid>
  
                    
           
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getParcels: () => dispatch(getParcelsAction()),
    sortParcels: (sortBy) => dispatch(sortParcels(sortBy)),
});

const mapStateToProps = state => ({
    isLoading: state.parcels.isLoading,
    sortBy: state.parcels.sortBy,
    sortOrder: state.parcels.sortOrder,
    parcels: getSortedParcels(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ParcelList);