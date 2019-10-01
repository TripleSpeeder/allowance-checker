import React from 'react';
import Container from '@material-ui/core/Container'
import NavBar from './components/NavBar'
import MainController from './components/MainController'

function App() {
  return (
      <Container>
        <NavBar/>
        <MainController/>
      </Container>
  );
}

export default App;
