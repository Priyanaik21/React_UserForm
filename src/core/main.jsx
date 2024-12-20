import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../core/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider value={defaultSystem}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
);

