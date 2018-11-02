import React from 'react';
import { connect } from 'react-redux';

import './ParcelList.css';

import Parcel from '../../components/Parcel/Parcel';
import ColumnTitles from '../../components/ColumnTitles/ColumnTitles';
import Header from '../../components/Header/Header';
import Decoration from '../../components/Decoration/Decoration';
import { getParcels as getParcelsAction } from '../../state-management/actions/parcels';

class ParcelList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            filteredParcels: [],
            dateFilter: false,
            statusFilter: true,
            weightFilter: true
        };
    }

    componentWillMount() {
        this.props.getParcels();
    }

    componentWillReceiveProps(nextProps){
        if(this.state.filteredParcels.length === 0) this.setState({
            filteredParcels: nextProps.parcels,
        })
    }
    
    sortByTime = () => {
        let dateFilter = !this.state.dateFilter
        let filteredParcels = this.state.filteredParcels

        if (dateFilter){
            filteredParcels = filteredParcels.sort((parcelOne, parcelTwo) => {
                return  new Date(parcelTwo.createdDate).getTime() - new Date(parcelOne.createdDate).getTime()
              })
        } else {
            filteredParcels = filteredParcels.sort((parcelOne, parcelTwo) => {
                return  new Date(parcelOne.createdDate).getTime() - new Date(parcelTwo.createdDate).getTime()
              })
        }

        this.setState({
            filteredParcels,
            dateFilter
        })
    }

    sortByStatus = () => {
        let statusFilter = !this.state.statusFilter
        let filteredParcels = this.state.filteredParcels

        if (statusFilter) {
            filteredParcels = filteredParcels.sort((parcelOne, parcelTwo) => {
                return parcelTwo.status - parcelOne.status
            })
        } else {
            filteredParcels = filteredParcels.sort((parcelOne, parcelTwo) => {
                return parcelOne.status - parcelTwo.status
            })
        }

        this.setState({
            filteredParcels,
            statusFilter
        })
    }

    sortByWeight = () => {
        let weightFilter = !this.state.weightFilter
        let filteredParcels = this.state.filteredParcels

        if (weightFilter) {
            filteredParcels = filteredParcels.sort((parcelOne, parcelTwo) => {
                return parcelOne.weight - parcelTwo.weight
            })
        } else {
            filteredParcels = filteredParcels.sort((parcelOne, parcelTwo) => {
                return parcelTwo.weight - parcelOne.weight
            })
        }

        this.setState({
            filteredParcels,
            weightFilter
        })
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
                <ColumnTitles timeFilter={this.sortByTime} statusFilter={this.sortByStatus} weightFilter={this.sortByWeight}/>     
                {this.props.parcels.map((parcel, index) => {
                    let buttonText = "View details";
                    if (parcel.recipient.id === this.props.userId) {
                        buttonText = "I'll deliver"
                    }
                    return <Parcel 
                        key={index}
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
});

const mapStateToProps = state => ({
    isLoading: state.parcels.isLoading,
    parcels: state.parcels.parcels,
});

export default connect(mapStateToProps, mapDispatchToProps)(ParcelList);