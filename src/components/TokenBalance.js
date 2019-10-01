import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

function TokenBalance(props) {
    const {contractInstance, address} = props

    const [balance, setBalance] = useState(undefined)
    const [decimals, setDecimals] = useState(undefined)

    // get decimals of current contract
    useEffect(()=>{
        const getDecimals = async () => {
            let decimals = await contractInstance.decimals();
            setDecimals(decimals)
        }
        if (contractInstance) {
            getDecimals()
        }
    }, [contractInstance])

    // get current address' balance of selected token
    useEffect(()=>{
        const updateBalance = async() => {
            console.log(`Updating balance for ${address}`)
            let balance = await contractInstance.balanceOf(address)
            setBalance(balance)
        }
        if (contractInstance) {
            updateBalance()
        }
    }, [address, contractInstance])


    return (
        <span> {balance ? balance.toString() : '...loading...'} ({decimals && decimals.toString()}) </span>
    )
}

TokenBalance.propTypes = {
    contractInstance: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired,
}

export default TokenBalance