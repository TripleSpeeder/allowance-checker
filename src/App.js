import React from 'react';
import NavBar from './components/NavBar'
import {AddressForm} from './components/AddressForm'
import Container from '@material-ui/core/Container'

function App() {
  return (
      <Container>
        <NavBar/>
        <AddressForm/>
      </Container>
  );
}

export default App;
