import type { AppProps } from "next/app";
import getLibrary from "../utils/web3/getLibrary";
import Web3ReactManager from "../providers/Web3ReactManager";
import { ThemeProvider } from "@theme-ui/core";
import theme from "../styles/theme";
import ModalManager from "../providers/ModalManager";
import { Web3ReactProvider } from "@web3-react/core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactManager>
        <ThemeProvider theme={theme}>
          <ModalManager>
            <Component {...pageProps} />
          </ModalManager>
        </ThemeProvider>
      </Web3ReactManager>
    </Web3ReactProvider>
  );
}