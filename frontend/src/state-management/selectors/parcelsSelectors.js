import { createSelector } from 'reselect';

const parcelsSelector = state => state.parcels.parcels;
const sortBySelector = state => state.parcels.sortBy;
const sortOrderSelector = state => state.parcels.sortOrder;

const startLocationSelector = state => state.parcels.startLocation;
const endLocationSelector = state => state.parcels.endLocation;
const statusSelector = state => state.parcels.status;
const weightFromSelector = state => state.parcels.weightFrom;
const weightToSelector  = state => state.parcels.weightTo;
const createdFromSelector = state => state.parcels.createdFrom;
const createdToSelector = state => state.parcels.createdTo;
const recipientSelector = state => state.parcels.recipient;
const courierSelector = state => state.parcels.courier;
const userIdSelector = state => state.parcels.userId;

const compareStrings = (a, b) =>{
    if(a < b) return -1;
    if(a === b) return 0;
    return -1;
}

export const getFilteredParcels = createSelector(
    startLocationSelector,
    endLocationSelector,
    statusSelector,
    weightFromSelector,
    weightToSelector,
    createdFromSelector,
    createdToSelector,
    recipientSelector,
    courierSelector,
    parcelsSelector,
    userIdSelector,
    (startLocation, endLocation, status, weightFrom, weightTo, createdFrom,  createdTo, recipient, courier, parcels, userId) => {
    let filteredParcels = [...parcels];
    const me = 'me';
            filteredParcels = startLocation !== '' && endLocation!== ''
            ? filteredParcels.filter(
                parcel => parcel['startLocation'].includes(startLocation) && parcel['endLocation'].includes(endLocation)
            )
            : filteredParcels;
        
            filteredParcels = status[0] || status[1] || status[2]  || status[3] 
            ? filteredParcels.filter(
                parcel =>  (status[0]  && parcel.status === 1) || (status[1] && parcel.status === 2)  || (status[2] && parcel.status ===  3) || (status[3]  && parcel.status === 4)
            )
            : filteredParcels;
            
            filteredParcels = weightFrom!== '' && weightTo !== '' 
            ? filteredParcels.filter(
                parcel => parseInt(weightFrom, 10)*1000 <= parcel['weight'] && parcel['weight'] <= parseInt(weightTo, 10)*1000
            )
            : filteredParcels;
            
            filteredParcels = createdFrom !== '' && createdTo !== ''
            ? filteredParcels.filter(
                parcel => new Date(createdFrom).getTime() <= new Date(parcel['createdDate']).getTime() && new Date(parcel['createdDate']).getTime() <= new Date(createdTo).getTime()
            )
            : filteredParcels;

            filteredParcels = recipient !== '' 
            ? filteredParcels.filter(
                parcel =>  userId === parcel.recipient.id ? me.includes(recipient.toLowerCase()) :((parcel.recipient.firstName).toLowerCase() + " " + (parcel.recipient.lastName).toLowerCase()).includes(recipient.toLowerCase()) 
            )
            : filteredParcels;
        
            filteredParcels = courier !== '' 
            ? filteredParcels.filter(
                parcel =>  userId === parcel.courier.id ? me.includes(courier.toLowerCase()) :((parcel.courier.firstName).toLowerCase() + " " + (parcel.courier.lastName).toLowerCase()).includes(courier.toLowerCase()) 
            )
            : filteredParcels;
        return filteredParcels

    }
);
export const getSortedParcels = createSelector(
    getFilteredParcels,
    sortBySelector,
    sortOrderSelector,
    (parcels, sortBy, sortOrder) => {
        let orderHelper = sortOrder === 'asc' ? 1 : -1;

        switch(sortBy){
            case 'createdDate':
            case 'delivered':
                return parcels.sort((parcelOne, parcelTwo) => 
                    (new Date(parcelOne[sortBy]).getTime() - new Date(parcelTwo[sortBy]).getTime()) * orderHelper
                );

            case 'weight':
            case 'status':
                return parcels.sort((parcelOne, parcelTwo) => 
                    (parcelOne[sortBy] - parcelTwo[sortBy]) * orderHelper
                );

            default:
                return parcels.sort((parcelOne, parcelTwo) => 
                    compareStrings(parcelOne, parcelTwo) * orderHelper
                );
        }
    }
);