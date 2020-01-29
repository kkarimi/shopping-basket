import React from 'react';
import styled from 'styled-components'
import { BasketContainer } from './BasketContainer';


const AppContainer = styled.div`
  font-family: arial;
  width: 90%;

  @media (min-width: 768px) {
    padding-left: 10%;
    padding-right: 10%;
    width: 50%;
  }
  padding: 5%;
`

const App: React.FC = () => {
  return (
    <AppContainer>
      <BasketContainer />
    </AppContainer>
  );
}

export default App;
