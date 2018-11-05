import React from 'react';
import { connect } from 'react-redux';

import './ParcelList.css';

import Parcel from '../../components/Parcel/Parcel';
import ColumnTitles from '../../components/ColumnTitles/ColumnTitles';
import Header from '../../components/Header/Header';
import Decoration from '../../components/Decoration/Decoration';
import { getParcels as getParcelsAction, 
        sortParcels as sortParcelsAction,
        deleteParcel as deleteParcelAction } from '../../state-management/actions/parcels';
import { getSortedParcels } from '../../state-management/selectors/parcelsSelectors'

class ParcelList extends React.Component {
    componentWillMount() {
        this.props.getParcels();
    }

    sortingFactory(sortBy) {
        return () => this.props.sortParcels(sortBy);
    }

    deleteParcelFactory(id) {
        return () => this.props.deleteParcel(id);
    }

    render() {

        return (       
            <div className="ParcelListPage">
                {/* <div>
                    <input type="checkbox"/> 
                    <div>Show mine</div>
                    <input type="checkbox"/>
                    <div>Show assigned to me</div>
                </div>
                 */}
                 <Header/>
                 <Decoration/>
                <section className="Parcels">
                <ColumnTitles
                    timeFilter={this.sortingFactory('createdDate')}
                    statusFilter={this.sortingFactory('status')}
                    weightFilter={this.sortingFactory('weight')}
                />     
                {this.props.parcels.map(parcel => {
                    let buttonText = "View details";
                    if (parcel.recipient.id === this.props.userId) {
                        buttonText = "I'll deliver"
                    }
                    return <Parcel 
                        key={parcel.id}
                        deleteAction={this.deleteParcelFactory(parcel.id)}
                        fromPoint={parcel.startLocation}
                        toPoint={parcel.endLocation}
                        status={parcel.status}
                        description={parcel.description} 
                        weight={parcel.weight} 
                        created={parcel.createdDate}
                        delivered={parcel.delivered}
                        recipient={
                            (parcel.recipient.id === this.props.userId)
                            ? "Me"
                            : parcel.recipient.firstName + " " + parcel.recipient.lastName
                        }
                        courier={
                            (parcel.courier.id === this.props.userId)
                            ? "Me"
                            : parcel.courier.firstName + " " + parcel.courier.lastName
                        }
                        buttonText={buttonText} />
                })}
                </section>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getParcels: () => dispatch(getParcelsAction()),
    deleteParcel: (id) => dispatch(deleteParcelAction(id)),
    sortParcels: (sortBy) => dispatch(sortParcelsAction(sortBy)),
});

const mapStateToProps = state => ({
    isLoading: state.parcels.isLoading,
    sortBy: state.parcels.sortBy,
    sortOrder: state.parcels.sortOrder,
    parcels: getSortedParcels(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ParcelList);