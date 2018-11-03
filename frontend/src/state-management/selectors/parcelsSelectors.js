import { createSelector } from 'reselect';

const parcelsSelector = state => state.parcels.parcels;
const sortBySelector = state => state.parcels.sortBy;
const sortOrderSelector = state => state.parcels.sortOrder;

const compareStrings = (a, b) =>{
    if(a < b) return -1;
    if(a === b) return 0;
    return -1;
}

export const getSortedParcels = createSelector(
    parcelsSelector,
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