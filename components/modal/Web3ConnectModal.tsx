import ModalContainer from "./ModalContainer";
import { Box } from "@theme-ui/components";
import theme, { SX } from "../../styles/theme";
import { useWeb3 } from "../../hooks/useWeb3";
import { injected, walletconnect } from "../../utils/web3/connectors";
import { useCallback, useEffect, useState } from "react";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { Web3Status } from "../../providers/Web3ReactManager";
import { useModal } from "../../hooks/useModal";

export default function Web3ConnectorModal() {
  const { activate, status, error, isWrongNetwork, account } = useWeb3();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);

  const handleConnect = useCallback(
    (connector: AbstractConnector) => {
      setLoading(true);
      activate(connector);
    },
    [activate]
  );

  useEffect(() => {
    if (status === Web3Status.READY) {
      closeModal();
    }
  }, [status]);

  return (
    <ModalContainer title={"Connect"} canClose={true}>
      <Box sx={sx.option} onClick={() => handleConnect(walletconnect)}>
        WalletConnect
      </Box>
      <Box sx={sx.option} onClick={() => handleConnect(injected)}>
        Metamask
      </Box>
      {loading && <Box sx={{ p: "10px 0 0 0" }}>Please check your wallet.</Box>}
      {isWrongNetwork && (
        <Box sx={sx.error}>Please connect to the correct network.</Box>
      )}
      {error && !isWrongNetwork && (
        <Box sx={sx.error}>Something went wrong. Please try again.</Box>
      )}
    </ModalContainer>
  );
}

const sx: SX = {
  option: {
    padding: "10px 20px",
    border: `1px solid ${theme.colors.text}`,
    "&:first-of-type": {
      borderBottom: "none",
    },
    "&:hover": theme.hover,
  },
  error: {
    padding: "10px 0 0 0",
    color: theme.colors.error,
  },
};