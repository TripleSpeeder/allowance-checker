import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import ContractSelector from './ContractSelector'

const availableContracts = [
    {
        shortname: 'DAI',
        name: 'DAI stable coin',
        address: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
    },
    {
        shortname: 'WETH',
        name: 'Wrapped Ether',
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    }
]

export const actions = {
    handleChange: action('handleChange'),
}

storiesOf('ContractSelector', module)
    .add('default', () => <ContractSelector
        availableContracts={availableContracts}
        selectedContractIndex={0}
        handleChange={actions.handleChange}
        // {...actions}
    />)
