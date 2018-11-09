import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './ParcelEdit.css'

import Header from '../../components/Header/Header';

const grayBackgroundStyles = {
    backgroundColor: '#F4F6F9',
    width: '95%',
    overflow: 'hidden'
};
const setWidth = {
    marginLeft: '5%',
    marginRight: '55%',
    width: '40%',
    padding: '12px'
};
const whiteField = {
    backgroundColor: "white",
    borderRadius: "5px"
};
const fullWidth = {
    width: '100%',
    padding: '4px'
};

class ParcelEdit extends Component{
    constructor(props) {
        super(props);

        console.log(props);
    }

    state = {
        parcel: this.props.parcel
            ? this.props.parcel
            : {
                recipient: {firstName: "Tester", lastName: "Testington"},
                startLocation: "Place",
                endLocation: "Another Place",
                description: "Some parcel",
                weight: 9001
              }
    };

    render() {
        return (
            <Grid
                container
                spacing={16}
                direction="column"
                alignItems="center"
                justify="flex-start"
                style={{paddingTop: 81}}
            >
                <Header/>
                <Grid item style={setWidth}>
                    <Button disableRipple>Back to delivery list</Button>
                </Grid>
                <Grid item style={setWidth}>
                    <h1>Edit order</h1>
                </Grid>
                <div style={grayBackgroundStyles}>
                    <Grid item style={setWidth}>
                        <h4>RECIPIENT</h4>
                        <Divider/>
                    </Grid>
                    <Grid item style={setWidth}>
                        <FormControl style={fullWidth}>
                            <FormLabel>FIRST NAME</FormLabel>
                            <TextField
                                variant="outlined"
                                inputProps={{style: whiteField}}
                                value={this.state.parcel.recipient.firstName}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item style={setWidth}>
                        <FormControl style={fullWidth}>
                            <FormLabel>LAST NAME</FormLabel>
                            <TextField
                                variant="outlined"
                                inputProps={{style: whiteField}}
                                value={this.state.parcel.recipient.lastName}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item style={setWidth}>
                        <h4>DELIVERY INFO</h4>
                        <Divider/>
                    </Grid>
                    <Grid item style={setWidth}>
                        <div className="ToAndFrom">
                            <FormControl style={fullWidth}>
                                <FormLabel>FROM</FormLabel>
                                <Select variant="outlined" value={this.state.parcel.startLocation}>
                                    <MenuItem value={this.state.parcel.startLocation}>{this.state.parcel.startLocation}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={fullWidth}>
                                <FormLabel>TO</FormLabel>
                                <Select variant="outlined" value={this.state.parcel.endLocation}>
                                    <MenuItem value={this.state.parcel.endLocation}>{this.state.parcel.endLocation}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>

                    <Grid item style={setWidth}>
                        <FormLabel>STATUS</FormLabel>
                        <div>
                            <Button>Open</Button>
                            <Button>Picked up</Button>
                            <Button>On the way</Button>
                            <Button>Delivered</Button>
                        </div>
                    </Grid>

                    <Grid item style={setWidth}>
                        <FormControl style={fullWidth}>
                            <FormLabel>DESCRIPTION</FormLabel>
                            <TextField
                                variant="outlined"
                                multiline
                                rows="6"
                                inputProps={{style: whiteField}}
                                value={this.state.parcel.description}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item style={setWidth}>
                        <FormControl style={fullWidth}>
                            <FormLabel>PARCEL WEIGHT</FormLabel>
                            <TextField
                                variant="outlined"
                                inputProps={{style: whiteField}}
                                value={this.state.parcel.weight}
                            />
                        </FormControl>
                    </Grid>
                </div>
                <Grid container justify="flex-end" style={fullWidth}>
                    <Grid item>
                        <Button>Cancel</Button>
                        <Button>Save</Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default ParcelEdit;