import { ChakraProvider } from '@chakra-ui/react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    /*  <AuthContext> */
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    /* </AuthContext> */
  );
}

export default MyApp;
