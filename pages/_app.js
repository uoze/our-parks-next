import { ProvideAuth } from "../lib/auth";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  );
}

export default MyApp;
