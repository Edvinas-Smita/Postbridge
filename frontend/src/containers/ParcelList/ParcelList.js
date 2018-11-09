import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button/Button';
import Modal from '@material-ui/core/Modal';
import { Redirect } from 'react-router-dom';

import './ParcelList.css';

import Parcel from '../../components/Parcel/Parcel';
import ColumnTitles from '../../components/ColumnTitles/ColumnTitles';
import Header from '../../components/Header/Header';
import Decoration from '../../components/Decoration/Decoration';
import {getParcels as getParcelsAction, sortParcels} from '../../state-management/actions/parcels';
import {getSortedParcels} from '../../state-management/selectors/parcelsSelectors'
import ParcelEdit from '../../components/ParcelEdit/ParcelEdit'

class ParcelList extends React.Component {
    /*constructor() {
        super();
    }*/

    state = {};

    componentWillMount() {
        this.props.getParcels();
    }

    sortingFactory(sortBy) {
        return () => this.props.sortParcels(sortBy);
    }

    editParcel(parcel) {
        return () => {
            this.setState({
                editingParcel: true,
                parcelToEdit: parcel
            });
        }
    };

    finishEdit = () => {
        this.setState({
            editingParcel: false,
            parcelToEdit: null
        });
    };

    render() {
        if (this.state.editingParcel) {
            return <Redirect to='/editParcel' />
        }
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
                {this.props.parcels.map((parcel, index) => {
                    let buttonText = "View details";
                    if (parcel.recipient.id === this.props.userId) {
                        buttonText = "I'll deliver"
                    }
                    return <div
                        className="ParcelAndEdit"
                        key={index}>
                        <Parcel
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
                        <div>
                            <Button onClick={this.editParcel(parcel)}>EDIT</Button>
                        </div>
                    </div>
                })}
                </section>
                <Modal
                    open={false && this.state.editingParcel}
                    onClose={this.finishEdit}
                >
                    <ParcelEdit parcel={this.state.parcelToEdit}/>
                </Modal>
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