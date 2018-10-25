import React from 'react';

import './ColumnTitles.css';

const parcelListHeader = (props) => (
    <div className="ColumnTitles">
        <div>DESTINATION</div>
        <div></div>
        <div>STATUS</div>
        <div>DESCRIPTION</div>
        <div>WEIGHT</div>
        <div>CREATED</div>
        <div>DELIVERED</div>
        <div>RECIPIENT</div>
        <div>COURIER</div>
    </div>
);

export default parcelListHeader;