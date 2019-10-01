import React, { useState } from "react";
import AddressForm from './AddressForm'

function AddressFormContainer(props) {
    const [address, setAddress] = useState("")
    const [valid, setValid] = useState(false)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Address ${address}`)
    }

    const handleChange = (evt) => {
        const input = evt.target.value
        // check for valid input (raw address and ENS name)
        const validAddress = (/^(0x)?[0-9a-f]{40}$/i.test(input))
        if(validAddress) {
            // TODO: Lookup reverse ENS entry
            setValid(true)
            setAddress(input)
        }
        else {
            setValid(false)
            setAddress(input)
        }
    }

    return (
        <AddressForm
            value={address}
            valid={valid}
            handleChange={handleChange}
        />
    )
}

export default AddressFormContainer