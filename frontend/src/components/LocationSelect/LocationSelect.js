import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';

class LocationSelect extends Component {
    changeHandler = e => {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value, this.props.name);
        }
    }
    
    render () {
        return (
            <Select
                variant="outlined"
                value={this.props.value}
                onChange={this.changeHandler}
                MenuProps={this.props.MenuProps}
                style={this.props.style}
            >
            {this.props.emptyMenuItem &&
                <MenuItem value=""><em>None</em></MenuItem>}
                {this.props.locations.map((location, index) => {
                    return (
                        <MenuItem key={index} value={location.name} selected={location.name===this.props.currentLocation}>
                            {location.name}
                        </MenuItem>);
                })}
        </Select>
        );
    }
}

const mapStateToProps = state => ({
    locations: state.others.locations,
});

export default connect(mapStateToProps, null)(LocationSelect);