import React, {useEffect, useState} from 'react'
import Web3 from 'web3'
import erc20ABI from 'human-standard-token-abi'
import contract from '@truffle/contract'
import Grid from '@material-ui/core/Grid'
import ContractSelector from './ContractSelector'
import AddressForm from './AddressForm'

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
    const [web3, setWeb3] = useState(undefined)
    const [contractInstance, setContractInstance] = useState(undefined)

    const [balance, setBalance] = useState(undefined)

    // initialize web3. TODO: Need to clarify what are correct dependencies to
    // reinstate web3 in case window.ethereum changes.
    useEffect(()=>{
        // use web3 provider from metamask
        console.log('Getting web3 via: ')
        console.log(window.ethereum)
        // don't reload page on network change...
        // window.ethereum.autoRefreshOnNetworkChange = false;
        setWeb3(new Web3(window.ethereum));
    }, [])

    // initialize contract instance
    useEffect(()=>{
        const initContract = async () => {
            const ERC20Contract = contract({abi: erc20ABI})
            ERC20Contract.setProvider(web3.currentProvider)
            let instance = await ERC20Contract.at(availableContracts[contractIndex].address)
            setContractInstance(instance)
        }
        if (web3) {
            console.log('Instantiating contract instance for ' + contractIndex)
            initContract()
        }
    }, [contractIndex, web3])

    // get current address' balance of selected token
    useEffect(()=>{
        const updateBalance = async() => {
            console.log(`Updating ${availableContracts[contractIndex].name} balance for ${address}`)
            let balance = await contractInstance.balanceOf(address)
            setBalance(balance)
        }
        if (addressValid) {
            updateBalance()
        } else {
            console.log('Clearing balance')
            setBalance(undefined)
        }
    }, [address, addressValid, contractInstance])

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
                  Current balance: {balance ? balance.toString() : 'none'}
            </Grid>
        </Grid>
    )
}

MainController.propTypes = {

}

export default MainController