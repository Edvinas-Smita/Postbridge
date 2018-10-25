import React from 'react';

import './Parcel.css';

const parcel = (props) => (
    <div className="Parcel">
            <div>{props.fromPoint}</div>
            <div>{props.toPoint}</div>
            <div>{props.status}</div>
            <div>{props.description}</div> 
            <div>{props.weight}</div> 
            <div>{props.created}</div>
            <div>{props.delivered}</div>
            <div>{props.recipient}</div>
            <div>{props.courier}</div>
            <button className="Button">{props.buttonText}</button>
    </div>
);

export default parcel;