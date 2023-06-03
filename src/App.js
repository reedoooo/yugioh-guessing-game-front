import React from 'react';
import Game from './Main';
import './index.css';
import theme from './theme';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Game />
    </ChakraProvider>
  );
};

export default App;
