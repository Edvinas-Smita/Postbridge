import React from 'react';

import './Parcel.css';
import {formatWeight} from '../../helpers';
import { STATUS } from '../../helpers';


const parcel = (props) => (
    <div className="Parcel">
            <div>{props.fromPoint}</div>
            <div>{props.toPoint}</div>
            <div>{STATUS[props.status]}</div>
            <div>{props.description}</div> 
            <div>{formatWeight(props.weight)}</div> 
            <div>{props.created.slice(0, 10)}</div>
            <div>{props.delivered}</div>
            <div>{props.recipient}</div>
            <div>{props.courier}</div>
            <button className="Button">{props.buttonText}</button>
    </div>
);

export default parcel;