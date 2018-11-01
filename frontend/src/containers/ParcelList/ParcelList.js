import React from 'react';

import './ParcelList.css';

import Parcel from '../../components/Parcel/Parcel';
import ColumnTitles from '../../components/ColumnTitles/ColumnTitles';
import Header from '../../components/Header/Header';
import Decoration from '../../components/Decoration/Decoration';
import data from '../../Database/db.json';

class ParcelList extends React.Component {
    state = {
        parcels: [],
        filteredParcels: [],
        dateFilter: false,
        statusFilter: true,
        weightFilter: true
    }

    componentWillMount() {
        this.setState({
            parcels: data.Parcels,
            filteredParcels: data.Parcels,
            }, 
            function() {this.sortByTime();}
        );
    }
    
    sortByTime = () => {
        let dateFilter = !this.state.dateFilter
        let filteredParcels = this.state.parcels

        if (dateFilter){
            filteredParcels = filteredParcels.sort((parcelOne, parcelTwo) => {
                return  new Date(parcelTwo.created).getTime() - new Date(parcelOne.created).getTime()
              })
        } else {
            filteredParcels = filteredParcels.sort((parcelOne, parcelTwo) => {
                return  new Date(parcelOne.created).getTime() - new Date(parcelTwo.created).getTime()
              })
        }

        this.setState({
            filteredParcels,
            dateFilter
        })
    }

    sortByStatus = () => {
        let statusFilter = !this.state.statusFilter
        let filteredParcels = this.state.parcels

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
        let filteredParcels = this.state.parcels

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
                {this.state.filteredParcels.map((parcel, index) => {
                    let buttonText = "View details";
                    if (parcel.recipient === 'me') {
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
                        recipient={parcel.recipient.firstName + " " + parcel.recipient.lastName}
                        courier={parcel.courier.firstName + " " + parcel.courier.lastName}
                        buttonText={buttonText} />
                })}
                </section>
            </div>
        )
    }
}
export default ParcelList;