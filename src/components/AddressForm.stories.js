import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AddressForm from './AddressForm'

const validAddress='0xd81064c954043b0dFDb84Ec3a80cC11a375f19AB'
const invalidAddress='0xInvalidAddress'

storiesOf('AddressForm', module)
    .add('empty', () => <AddressForm value={''} valid={false}/>)
    .add('invalid input', () => <AddressForm value={invalidAddress} valid={false}/>)
    .add('valid input', () => <AddressForm value={validAddress} valid={true}/>)
