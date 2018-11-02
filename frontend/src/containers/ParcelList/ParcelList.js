import React from 'react';

import './ParcelList.css';


import Header from '../../components/Header/Header';
import Decoration from '../../components/Decoration/Decoration';
import ParcelTable from '../../components/ParcelTable/ParcelTable';
import Grid from '@material-ui/core/Grid/Grid';

class ParcelList extends React.Component {
    state = {
        parcels: [
            { fromPoint: 'Toronto', toPoint: 'Kaunas', status: 1, delivery: 'plane',description: 'Books', weight: 150, created: "2018-05-19T23:15:30.000Z", delivered: '', recipient: 'me', courier: 'Arthur Jameson'},
            { fromPoint: 'Vilnius', toPoint: 'London', status: 2, delivery: 'plane',description: 'Electronic goods', weight: 3000, created: "2018-08-05T23:15:30.000Z", delivered: '', recipient: 'Patrick Strongwell', courier: 'Monica Wilde'},
            { fromPoint: 'Chicago', toPoint: 'Kaunas', status: 4, delivery: 'plane',description: 'Home appliances', weight: 2850, created: "2018-03-28T23:15:30.000Z", delivered: '21.09.2018', recipient: 'Vytautas Stankevicius', courier: 'Matt Cox'},
            { fromPoint: 'Kaunas', toPoint: 'Vilnius', status: 3, delivery: 'plane',description: 'Electronic goods', weight: 500, created: "2018-01-19T23:15:30.000Z", delivered: '', recipient: 'Lindsay Smith', courier: 'Carolyne James'},
            { fromPoint: 'Toronto', toPoint: 'Kaunas', status: 1, delivery: 'plane',description: 'Books', weight: 1250, created: "2018-08-19T23:15:30.000Z", delivered: '', recipient: 'me', courier: 'Arthur Jameson'},
            { fromPoint: 'Toronto', toPoint: 'Kaunas', status: 1, delivery: 'plane',description: 'Books', weight: 1500, created: "2018-08-11T23:15:30.000Z", delivered: '', recipient: 'me', courier: 'Arthur Jameson'},
            { fromPoint: 'Vilnius', toPoint: 'London', status: 2, delivery: 'plane',description: 'Electronic goods', weight: 3000, created: "2018-10-19T23:15:30.000Z", delivered: '', recipient: 'Patrick Strongwell', courier: 'Monica Wilde'},
            { fromPoint: 'Chicago', toPoint: 'Kaunas', status: 4, delivery: 'plane',description: 'Home appliances', weight: 2850, created: "2018-08-18T23:15:30.000Z", delivered: '21.09.2018', recipient: 'Vytautas Stankevicius', courier: 'Matt Cox'},
            { fromPoint: 'Kaunas', toPoint: 'Vilnius', status: 3, delivery: 'car',description: 'Electronic goods', weight: 500, created: "2018-01-15T23:15:30.000Z", delivered: '', recipient: 'Lindsay Smith', courier: 'Carolyne James'}
           
        ],
        filteredParcels: [],
        dateFilter: false,
        statusFilter: true,
        weightFilter: true
    }

    componentWillMount() {
        this.setState({
            parcels: this.state.parcels,
            filteredParcels: this.state.parcels
        })
        this.sortByTime();
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
export default ParcelList;