import React from 'react';

import './ColumnTitles.css';

const parcelListHeader = (props) => (
    <div className="ColumnTitles">
        <div>DESTINATION</div>
        <div></div>
        <div onClick={props.statusFilter}>STATUS</div>
        <div>DESCRIPTION</div>
        <div onClick={props.weightFilter}>WEIGHT</div>
        <div onClick={props.timeFilter}>CREATED</div>
        <div>DELIVERED</div>
        <div>RECIPIENT</div>
        <div>COURIER</div>
    </div>
);

export default parcelListHeader;