import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import {InputLabel} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

function ContractSelector(props) {
    const {availableContracts, handleChange, selectedContractIndex} = props

    const displayName = (index) => {
        return `${availableContracts[index].name} (${availableContracts[index].shortname})`
    }

    return (
        <FormControl>
            <InputLabel htmlFor="contract">Select contract</InputLabel>
            <Select
                value={selectedContractIndex}
                renderValue={displayName}
                onChange={handleChange}
            >
                {availableContracts.map((contract, index) => {
                    return <MenuItem
                        key={index}
                        value={index}
                    >
                        {displayName(index)}
                    </MenuItem>
                })}
            </Select>
        </FormControl>
    )
}

ContractSelector.propTypes = {
    availableContracts: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    selectedContractIndex: PropTypes.number.isRequired,
}

export default ContractSelector