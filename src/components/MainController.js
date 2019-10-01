import React, { useState } from "react";
import Grid from '@material-ui/core/Grid'
import ContractSelector from './ContractSelector'
import AddressForm from './AddressForm'
import Divider from '@material-ui/core/Divider'

const availableContracts = [
    {
        shortname: 'DAI',
        name: 'DAI stable coin',
        address: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
        decimals: 18,
    },
    {
        shortname: 'WETH',
        name: 'Wrapped Ether',
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        decimals: 18,
    },
    {
        shortname: 'USDT',
        name: 'Tether USD',
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        decimals: 6,
    },
]

function MainController(props) {
    // selected contract is tracked by its index in availableContracts array
    const [contractIndex, setContractIndex] = React.useState(0);
    const [address, setAddress] = useState("")
    const [addressValid, setAddressValid] = useState(false)

    const handleContractChange = event => {
        setContractIndex(event.target.value)
    }

    const handleAddressChange = (event) => {
        const input = event.target.value
        // check for valid input (raw address and ENS name)
        const validAddress = (/^(0x)?[0-9a-f]{40}$/i.test(input))
        if(validAddress) {
            // TODO: Lookup reverse ENS entry
            setAddressValid(true)
        }
        else {
            setAddressValid(false)
        }
        setAddress(input)
    }

    return (
        <Grid
            container
            spacing={3}
            direction='row'
            justify="center"
            alignItems="center"
        >
            <Grid item xs={6}>
                <ContractSelector
                    availableContracts={availableContracts}
                    handleChange={handleContractChange}
                    selectedContractIndex={contractIndex}
                />
            </Grid>
            <Grid item xs={6}>
                <AddressForm
                    handleChange={handleAddressChange}
                    value={address}
                    valid={addressValid}
                />
            </Grid>
            <Grid item xs={12}>
                  Content here!
            </Grid>
        </Grid>
    )
}

MainController.propTypes = {

}

export default MainController