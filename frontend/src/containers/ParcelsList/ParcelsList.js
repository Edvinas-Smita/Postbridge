import React from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button'
import { Link } from 'react-router-dom'

const ParcelsList = () => {
    return (
        <div>
            <Typography variant="h1">ParcelsList Mock</Typography>
            <Link to="/">
                <Button 
                    variant = "contained" 
                    color="primary"
                >
                    Back
                </Button>
            </Link>
        </div>
    )
}

export default ParcelsList;