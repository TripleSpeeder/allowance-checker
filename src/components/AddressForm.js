import React, { useState } from "react";
import {TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

function AddressForm(props) {

    const {value, valid, handleChange} = props

    const classes = useStyles();

    return (
        <form className={classes.container} noValidate>
            <TextField
                label="Address"
                helperText="Enter an address"
                value={value}
                onChange={handleChange}
                error={!valid}
                required={true}
                margin="normal"
                fullWidth={true}
            />
        </form>
    )
}

export default AddressForm