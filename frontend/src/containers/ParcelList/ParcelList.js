import React from 'react';

import './ParcelList.css';

import Parcel from '../../components/Parcel/Parcel';
import ColumnTitles from '../../components/ColumnTitles/ColumnTitles';
import Header from '../../components/Header/Header';
import Decoration from '../../components/Decoration/Decoration';

class ParcelList extends React.Component {
    state = {
        parcels: [
            { fromPoint: 'Toronto', toPoint: 'Kaunas', status: 'Open', description: 'Books', weight: '1.5kg', created: '21.09.2018', delivered: '', recipient: 'me', courier: 'Arthur Jameson'},
            { fromPoint: 'Vilnius', toPoint: 'London', status: 'Picked up', description: 'Electronic goods', weight: '3kg', created: '21.09.2018', delivered: '', recipient: 'Patrick Strongwell', courier: 'Monica Wilde'},
            { fromPoint: 'Chicago', toPoint: 'Kaunas', status: 'Delivered', description: 'Home appliances', weight: '2.85kg', created: '21.09.2018', delivered: '21.09.2018', recipient: 'Vytautas Stankevicius', courier: 'Matt Cox'},
            { fromPoint: 'Kaunas', toPoint: 'Vilnius', status: 'On the way', description: 'Electronic goods', weight: '0.5kg', created: '21.09.2018', delivered: '', recipient: 'Lindsay Smith', courier: 'Carolyne James'},
            { fromPoint: 'Toronto', toPoint: 'Kaunas', status: 'Open', description: 'Books', weight: '1.25kg', created: '21.09.2018', delivered: '', recipient: 'me', courier: 'Arthur Jameson'},
            { fromPoint: 'Toronto', toPoint: 'Kaunas', status: 'Open', description: 'Books', weight: '1.5kg', created: '21.09.2018', delivered: '', recipient: 'me', courier: 'Arthur Jameson'},
            { fromPoint: 'Vilnius', toPoint: 'London', status: 'Picked up', description: 'Electronic goods', weight: '3kg', created: '21.09.2018', delivered: '', recipient: 'Patrick Strongwell', courier: 'Monica Wilde'},
            { fromPoint: 'Chicago', toPoint: 'Kaunas', status: 'Delivered', description: 'Home appliances', weight: '2.85kg', created: '21.09.2018', delivered: '21.09.2018', recipient: 'Vytautas Stankevicius', courier: 'Matt Cox'},
            { fromPoint: 'Kaunas', toPoint: 'Vilnius', status: 'On the way', description: 'Electronic goods', weight: '0.5kg', created: '21.09.2018', delivered: '', recipient: 'Lindsay Smith', courier: 'Carolyne James'}
           
        ]
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
                <ColumnTitles/>     
                {this.state.parcels.map((parcel, index) => {
                    let buttonText = "View details";
                    if (parcel.recipient === 'me') {
                        buttonText = "I'll deliver"
                    }
                    return <Parcel 
                        key={index}
                        fromPoint={parcel.fromPoint}
                        toPoint={parcel.toPoint}
                        status={parcel.status}
                        description={parcel.description} 
                        weight={parcel.weight} 
                        created={parcel.created}
                        delivered={parcel.delivered}
                        recipient={parcel.recipient}
                        courier={parcel.courier}
                        buttonText={buttonText} />
                })}
                </section>
            </div>
        )
    }
}
export default ParcelList;