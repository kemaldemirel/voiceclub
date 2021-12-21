import React from 'react';
import AppHeader from './UI/AppHeader/AppHeader';
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import MainRecorder from './UI/MainRecorder/MainRecorder';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppHeader />
      <MainRecorder />
    </ChakraProvider>
  );
}

export default App;
